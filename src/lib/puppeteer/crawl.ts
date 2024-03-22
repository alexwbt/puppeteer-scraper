import puppeteer, { Browser, Page } from "puppeteer";
import logger from "../util/logger";
import CrawlerPageGetter from "./getter";
import CrawlerOutput from "./output";

export type CrawlerWaitOption = {
  timeout?: number;
  waitForSelector?: string;
  waitForAbsenceOfSelector?: string;

  clickIfExistSelector?: string;
  clickIfExistWaitOption?: CrawlerWaitOption;
};

export type CrawlerPageOption = {
  waitOption?: CrawlerWaitOption;

  saveContent?: boolean;
  contentSelector?: string;

  linkSelector?: string;
  linkTriggerWaitOption?: CrawlerWaitOption;

  childrenPage: {
    [url: string]: CrawlerPageOption | undefined;
  };

  linkLoaderLimit?: number;
  linkLoaderSelector?: string;
  linkLoaderMethod?: "windowScrollToBottom";
  linkLoaderTriggerWaitOption?: CrawlerWaitOption;
};

export type RootCrawlerPageOption = CrawlerPageOption & {
  url: string;
};

const selectElementByOuterHTML = async (page: Page, outerHTML: string, selector: string) => {
  const elements = await page.$$(selector);
  for (const element of elements) {
    const elementOuterHTML = await page.evaluate(e => e.outerHTML, element);

    if (elementOuterHTML === outerHTML)
      return element;
  }
  return null;
};

const wait = async (
  page: Page,
  {
    timeout,
    waitForSelector,
    waitForAbsenceOfSelector,

    clickIfExistSelector,
    clickIfExistWaitOption,
  }: CrawlerWaitOption,
  defaultTimeout: number = 5000,
) => {
  if (!waitForSelector && !waitForAbsenceOfSelector)
    await new Promise(resolve => setTimeout(resolve, timeout || defaultTimeout));

  if (waitForSelector)
    await page.waitForSelector(waitForSelector,
      { timeout: timeout || defaultTimeout });

  if (waitForAbsenceOfSelector)
    await page.waitForSelector(waitForAbsenceOfSelector,
      { timeout: timeout || defaultTimeout, hidden: true });

  if (clickIfExistSelector) {
    try {
      const elements = await page.$$(clickIfExistSelector);
      await Promise.all(elements.map(e => e.click()));
      await wait(page, clickIfExistWaitOption || {});
    } catch (e) { }
  }
};

const findChildPageOption = (childPage: Page, childrenPage: CrawlerPageOption["childrenPage"]) => {
  try {
    for (const [pattern, pageOption] of Object.entries(childrenPage))
      if (pattern === "*" || childPage.url().match(new RegExp(pattern)))
        return pageOption;
  } catch (e) { }
};

const crawlPage = async (
  pageGetter: CrawlerPageGetter,
  {
    saveContent,
    contentSelector,

    linkSelector,
    linkTriggerWaitOption,

    childrenPage,

    linkLoaderLimit,
    linkLoaderSelector,
    linkLoaderMethod,
    linkLoaderTriggerWaitOption,
  }: CrawlerPageOption,
  output: CrawlerOutput,
) => {
  const rootPage = await pageGetter.getPage();
  if (!rootPage) return;

  if (saveContent) {
    const fileName = await output.save(rootPage, contentSelector);
    await output.debugLog(pageGetter, `Saved to ${fileName}`);
  }

  if (!childrenPage || Object.keys(childrenPage).length === 0)
    return;

  const linkElementListHtml: string[] = [];

  const state = {
    linkLoaderIndex: 0,
    linkElementIndex: 0,
  };
  const hasLinkLoader = linkLoaderSelector || linkLoaderMethod;
  const linkLoadLimit = hasLinkLoader ? (linkLoaderLimit || 10) : 0;
  for (; state.linkLoaderIndex <= linkLoadLimit; state.linkLoaderIndex++) {
    const page = rootPage && rootPage.isClosed() ? await pageGetter.getPage() : rootPage;
    if (!page) return [];

    const triggerLinkLoader = async (linkLoadingPage: Page) => {
      if (!hasLinkLoader || state.linkLoaderIndex === 0) return;
      // trigger link loader "linkLoaderIndex" amount of times
      for (let i = 0; i < state.linkLoaderIndex; i++) {
        switch (linkLoaderMethod) {
          case "windowScrollToBottom":
            await page.evaluate(() => window.scrollTo(0, Number.MAX_SAFE_INTEGER));
            break;
          default:
            const linkLoaderElement = linkLoaderSelector && await linkLoadingPage.$(linkLoaderSelector);
            if (linkLoaderElement) await linkLoaderElement.click();
        }
        await wait(linkLoadingPage, linkLoaderTriggerWaitOption || {});
      }
    };
    await triggerLinkLoader(page);

    // get link elements html
    const newLinkElementListHtml = await Promise.all(
      (await page.$$(linkSelector || "*"))
        .map(e => page.evaluate(e => e.outerHTML, e)));

    // filter duplicate links
    const filtered = newLinkElementListHtml.filter(e => !linkElementListHtml.includes(e));
    linkElementListHtml.push(...filtered);

    output.debugLog(pageGetter, JSON.stringify({ ...state, newElements: filtered }, undefined, 2));

    for (; state.linkElementIndex < linkElementListHtml.length; state.linkElementIndex++) {
      const linkElementHtml = linkElementListHtml[state.linkElementIndex];

      const triggerLink = async () => {
        const linkTriggeringPage = await pageGetter.getPage();
        if (!linkTriggeringPage) return [];

        await triggerLinkLoader(linkTriggeringPage);

        // select link
        const linkElement = await selectElementByOuterHTML(linkTriggeringPage, linkElementHtml, linkSelector || "*");
        if (!linkElement) return [];

        // trigger link
        await linkElement.click();
        await wait(linkTriggeringPage, linkTriggerWaitOption || {});

        return await linkTriggeringPage.browser().pages();
      };

      try {
        const children = await triggerLink();
        for (let pageIndex = 0; pageIndex < children.length; pageIndex++) {
          const childPageOption = findChildPageOption(children[pageIndex], childrenPage);
          if (!childPageOption) continue;

          // create child page getter
          const childPageGetter = new CrawlerPageGetter(
            async () => {
              const pages = await triggerLink();
              await wait(pages[pageIndex], childPageOption.waitOption || {});
              return pages[pageIndex];
            },
            pageGetter,
            state.linkLoaderIndex,
            linkElementHtml,
            pageIndex,
          );
          // recursive crawl page
          try {
            await crawlPage(childPageGetter, childPageOption, output);
          } catch (error: any) {
            await output.debugLog(childPageGetter, `${error}`);
            logger.debug(error);
          }
        }
      } catch (error: any) {
        await output.debugLog(pageGetter, `${linkElementHtml}: ${error}`);
        logger.debug(error);
      }
    }
  }
};

const crawl = async (crawlerPage: RootCrawlerPageOption, id: string) => {
  const browserWrapper: { browser: Browser | undefined } = { browser: undefined };

  const createBrowser = () => puppeteer.launch({
    headless: false,
    args: [`--window-size=1500,1000`],
    defaultViewport: null,
  });

  const rootPageGetter = new CrawlerPageGetter(async () => {
    browserWrapper.browser && await browserWrapper.browser.close();
    browserWrapper.browser = await createBrowser();

    // load page
    const page = (await browserWrapper.browser.pages())[0];
    await page.goto(crawlerPage.url);
    await wait(page, crawlerPage.waitOption || {});

    return page;
  });
  const output = new CrawlerOutput(id);

  try {
    logger.info(`Begin crawling (id: ${id}): ${crawlerPage.url}`);

    await output.init();
    await output.debugLog(rootPageGetter, `Input: ${JSON.stringify(crawlerPage, undefined, 2)}`);

    await crawlPage(rootPageGetter, crawlerPage, output);

    logger.info(`Complete crawling (id: ${id}): ${crawlerPage.url}`);
    await output.debugLog(rootPageGetter, `Completed`);
  } catch (e) {
    logger.error(`Exception thrown while crawling (id: ${id}):`, e);
    await output.debugLog(rootPageGetter, `${e}`);
  }
  browserWrapper.browser && await browserWrapper.browser.close();
};

export default crawl;
