import { anonymizeProxy } from "proxy-chain";
import { ElementHandle, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getEnvStringRequired } from "../util/env";
import logger from "../util/logger";
import CrawlerPageGetter from "./getter";
import CrawlerOutput from "./output";
import { ClickOption, CrawlerPageOption, CrawlerState, CrawlerWaitOption, RootCrawlerPageOption } from "./types";

const PROXY_URL_PROMISE = anonymizeProxy(getEnvStringRequired("PROXY_URL"));

export const USER_STOPPAGE = "User Stoppage";

puppeteer
  .use(StealthPlugin())
  .use(AdblockerPlugin({ blockTrackers: true }));

const selectElementByOuterHTML = async (page: Page, outerHTML: string, selector: string) => {
  const elements = await page.$$(selector);
  for (const element of elements) {
    const elementOuterHTML = await page.evaluate(e => e.outerHTML, element);

    if (elementOuterHTML === outerHTML)
      return element;
  }
  return null;
};

const click = async (element: ElementHandle<Element>, clickOption?: ClickOption) => {
  if (clickOption?.jsClick) {
    await element.evaluate(e => {
      (e as HTMLElement).click && (e as HTMLElement).click();
    });
    return;
  }

  await element.click(clickOption);
};

const wait = async (
  page: Page,
  {
    timeout,
    waitForSelector,
    waitForAbsenceOfSelector,

    clickIfExistSelector,
    clickIfExistClickOption,
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
      await Promise.all(elements.map(e =>
        click(e, clickIfExistClickOption).catch(() => { })));
    } catch (e) { }

    await wait(page, clickIfExistWaitOption || {});
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
    linkTriggerClickOption,
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
  await click(linkElement, linkTriggerClickOption);
  await wait(linkTriggeringPage, linkTriggerWaitOption || {});

  return await linkTriggeringPage.browser().pages();
};

const crawlPage = async (
  parentState: CrawlerState,
  pageGetter: CrawlerPageGetter,
  option: CrawlerPageOption,
  output: CrawlerOutput,
  onUpdate: () => Promise<void>,
) => {
  const {
    saveContent,
    fieldSelector,
    contentSelector,
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
    const fileNames = await output.save(rootPage, fieldSelector, contentSelector);
    await output.debugLog(pageGetter, `Saved to ${fileNames.join(",")}`);
    if (!parentState.output) parentState.output = [];
    parentState.output.push(...fileNames);
  }

  if (!childrenPage || Object.keys(childrenPage).length === 0)
    return;

  if (!parentState.childState) parentState.childState = {};
  const state = parentState.childState;
  state.linkLoaderIndex = 0;
  if (!state.linkElementIndex) state.linkElementIndex = 0;
  if (!state.linkElementListHtml) state.linkElementListHtml = [];

  const hasLinkLoader = linkLoaderSelector || linkLoaderMethod;
  const linkLoadLimit = hasLinkLoader ? (linkLoaderLimit || 10) : 0;
  for (; state.linkLoaderIndex <= linkLoadLimit; state.linkLoaderIndex++) {
    const page = await pageGetter.getPage();
    if (!page) return;

    await triggerLinkLoader(state, page, option);

    // get link elements html
    const newLinkElementListHtml = await Promise.all(
      (await page.$$(linkSelector || "*"))
        .map(e => page.evaluate(e => e.outerHTML, e)));

    // filter duplicate links
    const filtered = newLinkElementListHtml.filter(e => !state.linkElementListHtml?.includes(e));
    state.linkElementListHtml.push(...filtered);

    output.debugLog(pageGetter, JSON.stringify({ ...state, newElements: filtered }, undefined, 2));

    for (; state.linkElementIndex < state.linkElementListHtml.length; state.linkElementIndex++) {
      const linkElementHtml = state.linkElementListHtml[state.linkElementIndex];

      try {
        const pages = await triggerLink(state, pageGetter, linkElementHtml, option);
        const parentTabIndex = parentState.tabIndex || 0;
        // crawl children
        for (
          state.tabIndex = reuseTab?.childrenBackMethod === "closeNewTab"
            ? parentTabIndex + 1 : parentTabIndex;
          state.tabIndex < pages.length;
          state.tabIndex++
        ) {
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
            await crawlPage(state, childPageGetter, childPageOption, output, onUpdate);
            await onUpdate();
          } catch (error: any) {
            if (error === USER_STOPPAGE) throw USER_STOPPAGE;
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
        if (error === USER_STOPPAGE) throw USER_STOPPAGE;
        await output.debugLog(pageGetter, `${linkElementHtml}: ${error}`);
        logger.debug(error);
      }
    }
  }
};

const crawl = async (
  id: string,
  state: CrawlerState,
  crawlerPage: RootCrawlerPageOption,
  onUpdate: () => Promise<void>,
  onComplete: () => Promise<void>,
  onError: (error: any) => Promise<void>,
) => {
  if (!state.childState) state.childState = {};

  const browser = await puppeteer.launch({
    ...crawlerPage.launchOption,
    args: [
      ...(crawlerPage.launchOption?.args || []),
      ...(crawlerPage.proxy
        ? [`--proxy-server=${await PROXY_URL_PROMISE}`]
        : []),
    ],
  });

  const rootPageGetter = new CrawlerPageGetter(async () => {
    await onUpdate();
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
  const output = new CrawlerOutput(id, state.childState);

  try {
    logger.info(`Begin crawling (id: ${id}): ${crawlerPage.url}`);

    await output.init();
    await output.debugLog(rootPageGetter, `Input: ${JSON.stringify(crawlerPage, undefined, 2)}`);

    await crawlPage(state, rootPageGetter, crawlerPage, output, onUpdate);
    state.childState.completed = true;

    logger.info(`Complete crawling (id: ${id}): ${crawlerPage.url}`);
    await Promise.all([
      output.debugLog(rootPageGetter, `Completed`),
      onComplete(),
    ]);
  } catch (e) {
    if (e !== USER_STOPPAGE) {
      state.childState.error = `${e}`;
      logger.error(`Exception thrown while crawling (id: ${id}):`, e);
      await Promise.all([
        output.debugLog(rootPageGetter, `${e}`),
        onError(e),
      ]);
    } else {
      logger.info(`Stopped crawling (id: ${id}): ${crawlerPage.url}`);
    }
  }
  await browser.close();
};

export default crawl;
