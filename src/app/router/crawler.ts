import express from "express";
import RequestHandlerError from "../../lib/error/RequestHandlerError";
import { useRequestHandler } from "../../lib/router/useRequestHandler";
import { crawl, stop } from "../crawl";
import { prismaClient } from "../prisma";
import { GetCrawlerStateSchema, RootCrawlerPageSchema } from "../schema/crawler";

const crawlerRouter = express.Router();

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

    crawl(id, state, option);

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
    crawl(crawlProcess.id, state, crawlProcess.option);

    return { status: 200, };
  },
});

// Stop Crawl
useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/stop/:id",
  paramsSchema: GetCrawlerStateSchema,
  requestHandler: async ({ params: { id } }) => {
    stop(+id);
    return { status: 200, };
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
