import { CrawlState } from "@prisma/client";
import express from "express";
import RequestHandlerError from "../../lib/error/RequestHandlerError";
import crawl, { USER_STOPPAGE } from "../../lib/puppeteer/crawl";
import { CrawlerState, RootCrawlerPageOption } from "../../lib/puppeteer/types";
import { useRequestHandler } from "../../lib/router/useRequestHandler";
import { prismaClient } from "../prisma";
import { GetCrawlerStateSchema, RootCrawlerPageSchema } from "../schema/crawler";

const crawlerRouter = express.Router();

const crawlerStates: { [id: number]: CrawlerState } = {};

const _crawl = (id: number, state: CrawlerState, option: RootCrawlerPageOption) => {
  crawlerStates[id] = state;
  crawl(`${id}`, state, option,
    // on update
    async () => {
      if (state.stopped) {
        await prismaClient.crawl.update({
          where: { id },
          data: { data: state.childState, state: CrawlState.STOPPED },
        });
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
    },
    // on error
    async () => {
      await prismaClient.crawl.update({
        where: { id },
        data: { data: state.childState, state: CrawlState.ERROR },
      });
    },
  );
}

// Start Crawl
useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/crawl",
  bodySchema: RootCrawlerPageSchema,
  requestHandler: async ({ body: option }) => {

    const state = { childState: { completed: false } };

    const { id } = await prismaClient.crawl.create({
      data: {
        data: state.childState,
        option,
      },
      select: { id: true },
    });

    _crawl(id, state, option);

    return {
      status: 200,
      body: { id },
    };
  },
});

// Resume Crawl
useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/resume/:id",
  paramsSchema: GetCrawlerStateSchema,
  requestHandler: async ({ params: { id } }) => {

    const crawlProcess = await prismaClient.crawl.findFirst({
      where: { id: +id },
    });
    if (!crawlProcess)
      throw new RequestHandlerError(400, "Invalid id");

    const state = { childState: crawlProcess.data };

    _crawl(crawlProcess.id, state, crawlProcess.option);

    return {
      status: 200,
      body: { state: crawlProcess.data },
    };
  },
});


// Stop Crawl
useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/stop/:id",
  paramsSchema: GetCrawlerStateSchema,
  requestHandler: async ({ params: { id } }) => {

    if (!crawlerStates[+id])
      throw new RequestHandlerError(400, "Invalid id");

    crawlerStates[+id].stopped = true;

    return {
      status: 200,
      body: { state: crawlerStates[+id].childState },
    };
  },
});

// Get State
useRequestHandler({
  router: crawlerRouter,
  method: "get",
  path: "/state/:id",
  paramsSchema: GetCrawlerStateSchema,
  requestHandler: async ({ params: { id } }) => {

    const crawlProcess = await prismaClient.crawl.findFirst({
      where: { id: +id },
      select: { data: true },
    });
    if (!crawlProcess)
      throw new RequestHandlerError(400, "Invalid id");

    return {
      status: 200,
      body: { state: crawlProcess.data },
    };
  },
});

// Get OUtput
crawlerRouter.use("/output", express.static("output"));

export default crawlerRouter;
