import { GoToOptions, PuppeteerLaunchOptions } from "puppeteer";

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
  stopped?: boolean;
  linkLoaderIndex?: number;
  linkElementIndex?: number;
  tabIndex?: number;
  childState?: CrawlerState;
  output?: string[];
  savedCount?: { [name: string]: number },
  linkElementListHtml?: string[];
};
