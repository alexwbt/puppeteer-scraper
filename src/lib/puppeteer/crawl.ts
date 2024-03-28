import { GoToOptions, Page, PuppeteerLaunchOptions } from "puppeteer";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import logger from "../util/logger";
import CrawlerPageGetter from "./getter";
import CrawlerOutput from "./output";

puppeteer
  .use(StealthPlugin())
  .use(AdblockerPlugin({ blockTrackers: true }));

export type CrawlerWaitOption = {
  timeout?: number;
  waitForSelector?: string;
  waitForAbsenceOfSelector?: string;

  clickIfExistSelector?: string;
  clickIfExistWaitOption?: CrawlerWaitOption;
};

export type ReuseTabOption = {
  childrenBackMethod: "closeNewTab" | "browserBack" | "backSelector" | "noAction";
  childrenBackSelector?: string;
  childrenBackWaitOption?: CrawlerWaitOption;
};

export type CrawlerPageOption = {
  waitOption?: CrawlerWaitOption;

  reuseTab?: ReuseTabOption;

  saveContent?: boolean;
  fieldSelector?: { [key: string]: string };

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

  launchOption?: PuppeteerLaunchOptions;
  navigateOption?: GoToOptions;
};

export type CrawlerState = {
  error?: string;
  completed?: boolean;
  linkLoaderIndex?: number;
  linkElementIndex?: number;
  tabIndex?: number;
  childState?: CrawlerState;
  output?: string[];
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
    try {
      await page.waitForSelector(waitForSelector,
        { timeout: timeout || defaultTimeout });
    } catch (e) { }

  if (waitForAbsenceOfSelector)
    try {
      await page.waitForSelector(waitForAbsenceOfSelector,
        { timeout: timeout || defaultTimeout, hidden: true });
    } catch (e) { }

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

const triggerLinkLoader = async (
  state: CrawlerState,
  linkLoadingPage: Page,
  {
    linkLoaderSelector,
    linkLoaderMethod,
    linkLoaderTriggerWaitOption,
    reuseTab,
  }: CrawlerPageOption,
) => {
  const hasLinkLoader = linkLoaderSelector || linkLoaderMethod;
  const linkLoaderIndex = state.linkLoaderIndex || 0;
  if (!hasLinkLoader || linkLoaderIndex === 0) return;
  // trigger link loader "linkLoaderIndex" amount of times
  // unless "reuseTab", then just once
  for (let i = 0; i < (reuseTab ? 1 : linkLoaderIndex); i++) {
    switch (linkLoaderMethod) {
      case "windowScrollToBottom":
        await linkLoadingPage.evaluate(() => window.scrollTo(0, Number.MAX_SAFE_INTEGER));
        break;
      default:
        const linkLoaderElement = linkLoaderSelector && await linkLoadingPage.$(linkLoaderSelector);
        if (linkLoaderElement) await linkLoaderElement.click();
    }
    await wait(linkLoadingPage, linkLoaderTriggerWaitOption || {});
  }
};

const triggerLink = async (
  state: CrawlerState,
  pageGetter: CrawlerPageGetter,
  linkElementHtml: string,
  option: CrawlerPageOption,
) => {
  const {
    linkSelector,
    linkTriggerWaitOption,
    reuseTab,
  } = option;

  const linkTriggeringPage = await pageGetter.getPage();
  if (!linkTriggeringPage) return [];

  if (!reuseTab)
    await triggerLinkLoader(state, linkTriggeringPage, option);

  // select link
  const linkElement = await selectElementByOuterHTML(linkTriggeringPage, linkElementHtml, linkSelector || "*");
  if (!linkElement) return [];

  // trigger link
  await linkElement.click();

  if (reuseTab && reuseTab.childrenBackMethod !== "closeNewTab")
    // close all new tabs if childrenBackMethod is not closeNewTab
    await Promise.all((await linkTriggeringPage.browser().pages())
      .slice((state.tabIndex || 0) + 1).map(p => p.close()));

  await wait(linkTriggeringPage, linkTriggerWaitOption || {});

  return await linkTriggeringPage.browser().pages();
};

const crawlPage = async (
  parentState: CrawlerState,
  pageGetter: CrawlerPageGetter,
  option: CrawlerPageOption,
  output: CrawlerOutput,
) => {
  const {
    saveContent,
    fieldSelector,
    reuseTab,
    linkSelector,
    linkLoaderLimit,
    linkLoaderSelector,
    linkLoaderMethod,
    childrenPage,
  } = option;

  const rootPage = await pageGetter.getPage();
  if (!rootPage) return;

  if (saveContent) {
    const fileName = await output.save(rootPage, fieldSelector);
    await output.debugLog(pageGetter, `Saved to ${fileName}`);
    if (!parentState.output) parentState.output = [];
    parentState.output.push(fileName);
  }

  if (!childrenPage || Object.keys(childrenPage).length === 0)
    return;

  const linkElementListHtml: string[] = [];

  const state = parentState.childState = {
    ...parentState.childState,
    linkLoaderIndex: 0,
    linkElementIndex: 0,
  };
  const hasLinkLoader = linkLoaderSelector || linkLoaderMethod;
  const linkLoadLimit = hasLinkLoader ? (linkLoaderLimit || 10) : 0;
  for (; state.linkLoaderIndex <= linkLoadLimit; state.linkLoaderIndex++) {
    const page = await pageGetter.getPage();
    if (!page) return [];

    await triggerLinkLoader(state, page, option);

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

      try {
        const pages = await triggerLink(state, pageGetter, linkElementHtml, option);
        const parentTabIndex = parentState.tabIndex || 0;
        // crawl children
        for (state.tabIndex = parentTabIndex; state.tabIndex < pages.length; state.tabIndex++) {
          const childPageOption = findChildPageOption(pages[state.tabIndex], childrenPage);
          if (!childPageOption) continue;

          // create child page getter
          const childPageGetter = new CrawlerPageGetter(
            async () => {
              const childPage = reuseTab ? pages[state.tabIndex || 0]
                : (await triggerLink(state, pageGetter, linkElementHtml, option))[state.tabIndex || 0];
              childPage && await wait(childPage, childPageOption.waitOption || {});
              return childPage;
            },
            pageGetter,
            state.linkLoaderIndex,
            linkElementHtml,
            state.tabIndex,
          );
          // recursive crawl page
          try {
            await crawlPage(state, childPageGetter, childPageOption, output);
          } catch (error: any) {
            await output.debugLog(childPageGetter, `${error}`);
            logger.debug(error);
          }
        }

        if (reuseTab) {
          switch (reuseTab.childrenBackMethod) {
            case "closeNewTab":
              await Promise.all(pages.slice(parentTabIndex + 1).map(p => p.close()));
              break;
            case "browserBack":
              await pages[parentTabIndex].goBack();
              break;
            case "backSelector":
              if (reuseTab.childrenBackSelector) {
                const backButton = await pages[parentTabIndex].$(reuseTab.childrenBackSelector || "*")
                backButton && await backButton?.click();
              }
              break;
            default:
          }
          if (reuseTab.childrenBackWaitOption)
            await wait(pages[parentTabIndex], reuseTab.childrenBackWaitOption);
        }

      } catch (error: any) {
        await output.debugLog(pageGetter, `${linkElementHtml}: ${error}`);
        logger.debug(error);
      }
    }
  }
};

const crawl = async (state: CrawlerState, crawlerPage: RootCrawlerPageOption, id: string) => {
  const browser = await puppeteer.launch({ ...crawlerPage.launchOption });

  const rootPageGetter = new CrawlerPageGetter(async () => {
    const pages = await browser.pages();

    // re-visit root page if the first tab is blank or speedOptimizationOption.reuseTab is false
    if (pages[0].url() === "about:blank" || !crawlerPage.reuseTab) {
      // close all tabs but first
      await Promise.all(pages.slice(1).map(p => p.close()));

      await pages[0].goto(crawlerPage.url, { ...crawlerPage.navigateOption });
      await wait(pages[0], crawlerPage.waitOption || {});
    }
    return pages[0];
  });
  const output = new CrawlerOutput(id);

  try {
    logger.info(`Begin crawling (id: ${id}): ${crawlerPage.url}`);

    await output.init();
    await output.debugLog(rootPageGetter, `Input: ${JSON.stringify(crawlerPage, undefined, 2)}`);

    await crawlPage(state, rootPageGetter, crawlerPage, output);
    state.childState = { ...state.childState, completed: true };

    logger.info(`Complete crawling (id: ${id}): ${crawlerPage.url}`);
    await output.debugLog(rootPageGetter, `Completed`);
  } catch (e) {
    state.childState = { ...state.childState, error: `${e}` };
    logger.error(`Exception thrown while crawling (id: ${id}):`, e);
    await output.debugLog(rootPageGetter, `${e}`);
  }
  await browser.close();
};

export default crawl;
