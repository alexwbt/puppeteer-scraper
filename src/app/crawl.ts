import { CrawlState } from "@prisma/client";
import RequestHandlerError from "../lib/error/RequestHandlerError";
import crawl_, { USER_STOPPAGE } from "../lib/puppeteer/crawl";
import { CrawlerState, RootCrawlerPageOption } from "../lib/puppeteer/types";
import { prismaClient } from "./prisma";

const crawlerStates: { [id: number]: CrawlerState | undefined } = {};

export const crawl = (id: number, state: CrawlerState, option: RootCrawlerPageOption) => {
  if (crawlerStates[id]) return;

  crawlerStates[id] = state;
  crawl_(`${id}`, state, option,
    // on update
    async () => {
      if (state.stopped) {
        await prismaClient.crawl.update({
          where: { id },
          data: { data: state.childState, state: CrawlState.STOPPED },
        });
        crawlerStates[id] = undefined;
        throw USER_STOPPAGE;
      }
      await prismaClient.crawl.update({
        where: { id },
        data: { data: state.childState, state: CrawlState.RUNNING },
      });
    },
    // on complete
    async () => {
      await prismaClient.crawl.update({
        where: { id },
        data: { data: state.childState, state: CrawlState.COMPLETED },
      });
      crawlerStates[id] = undefined;
    },
    // on error
    async () => {
      await prismaClient.crawl.update({
        where: { id },
        data: { data: state.childState, state: CrawlState.ERROR },
      });
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
