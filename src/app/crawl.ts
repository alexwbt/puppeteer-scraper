import { CrawlState } from "@prisma/client";
import RequestHandlerError from "../lib/error/RequestHandlerError";
import crawl_, { USER_STOPPAGE } from "../lib/puppeteer/crawl";
import { CrawlerStateData, RootCrawlerPageOption } from "../lib/puppeteer/types";
import { prismaClient } from "./prisma";
import { createWebhookInstance } from "./webhook";
import logger from "../lib/util/logger";

const crawlerStates: { [id: number]: CrawlerStateData | undefined } = {};

export const crawl = (id: number, state: CrawlerStateData, option: RootCrawlerPageOption) => {
  if (crawlerStates[id]) return;

  const { onEvent } = createWebhookInstance(option.webhookOption);

  const updateCrawlerProcess = async (id: number, state: CrawlState, stateData: CrawlerStateData) => {
    // update db
    await prismaClient.crawl.update({
      where: { id },
      data: { data: stateData.childState, state },
    });
    // send webhook event
    onEvent(id, CrawlState.STOPPED, stateData.childState || {})
      .catch(e => logger.error("Failed send webhook event.", e));
  };

  crawlerStates[id] = state;
  crawl_(`${id}`, state, option,
    // on update
    async () => {
      if (state.stopped) {
        await updateCrawlerProcess(id, CrawlState.STOPPED, state);
        crawlerStates[id] = undefined;
        throw USER_STOPPAGE;
      }
      await updateCrawlerProcess(id, CrawlState.RUNNING, state);
    },
    // on complete
    async () => {
      await updateCrawlerProcess(id, CrawlState.COMPLETED, state);
      crawlerStates[id] = undefined;
    },
    // on error
    async () => {
      await updateCrawlerProcess(id, CrawlState.ERROR, state);
      crawlerStates[id] = undefined;
    },
  );
};

export const stop = (id: number) => {
  const state = crawlerStates[id];
  if (!state)
    throw new RequestHandlerError(400, "Invalid id");

  state.stopped = true;
};
