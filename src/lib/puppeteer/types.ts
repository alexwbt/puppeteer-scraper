import { CrawlState } from "@prisma/client";
import { ClickOptions, GoToOptions, PuppeteerLaunchOptions } from "puppeteer";

export type CrawlerWaitOption = {
  timeout?: number;
  waitForSelector?: string;
  waitForAbsenceOfSelector?: string;

  clickIfExistSelector?: string;
  clickIfExistClickOption?: ClickOption;
  clickIfExistWaitOption?: CrawlerWaitOption;
};

export type ReuseTabOption = {
  childrenBackMethod: "closeNewTab" | "browserBack" | "backSelector" | "noAction";
  childrenBackSelector?: string;
  childrenBackWaitOption?: CrawlerWaitOption;
};

export type ClickOption = ClickOptions & {
  jsClick?: boolean;
};

export type CrawlerPageOption = {
  waitOption?: CrawlerWaitOption;

  reuseTab?: ReuseTabOption;

  saveContent?: boolean;
  contentSelector?: string;
  fieldSelector?: { [key: string]: string };

  linkSelector?: string;
  linkTriggerClickOption?: ClickOption;
  linkTriggerWaitOption?: CrawlerWaitOption;

  childrenPage: {
    [url: string]: CrawlerPageOption | undefined;
  };

  linkLoaderLimit?: number;
  linkLoaderSelector?: string;
  linkLoaderMethod?: "windowScrollToBottom";
  linkLoaderTriggerWaitOption?: CrawlerWaitOption;
};

export type WebhookOption = {
  url: string;
  events?: CrawlState[];
  headers?: { [header: string]: string; };
  minOutputBatchSize?: number;
  deduplicateOutput?: boolean;
};

export type RootCrawlerPageOption = CrawlerPageOption & {
  url: string;
  proxy?: boolean;
  webhookOption?: WebhookOption;
  launchOption?: PuppeteerLaunchOptions;
  navigateOption?: GoToOptions;
};

export type CrawlerStateData = {
  error?: string;
  completed?: boolean;
  stopped?: boolean;
  linkLoaderIndex?: number;
  linkElementIndex?: number;
  tabIndex?: number;
  childState?: CrawlerStateData;
  output?: string[];
  savedCount?: { [name: string]: number },
  linkElementListHtml?: string[];
  webhookState?: {
    sequenceNumber: number,
    lastOutput:  string[],
    lastState: CrawlState | undefined,
  },
};
