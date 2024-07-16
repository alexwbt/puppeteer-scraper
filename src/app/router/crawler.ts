import express from "express";
import RequestHandlerError from "../../lib/error/RequestHandlerError";
import { useRequestHandler } from "../../lib/router/useRequestHandler";
import { crawl, stop } from "../crawl";
import { prismaClient } from "../prisma";
import { GetCrawlerStateSchema, RootCrawlerPageSchema, WebhookOptionSchema } from "../schema/crawler";

const crawlerRouter = express.Router();

// Start Crawl
useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/crawl",
  bodySchema: RootCrawlerPageSchema,
  requestHandler: async ({ body: option }) => {

    const state = { childState: { completed: false } };

    const optionWithoutWebhook = { ...option };
    delete optionWithoutWebhook.webhookOption;

    const { id } = await prismaClient.crawl.create({
      data: {
        data: state.childState,
        option: optionWithoutWebhook,
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
  bodySchema: WebhookOptionSchema,
  paramsSchema: GetCrawlerStateSchema,
  requestHandler: async ({ params: { id }, body: webhookOption }) => {
    const crawlProcess = await prismaClient.crawl.findFirst({
      where: { id: +id },
    });
    if (!crawlProcess)
      throw new RequestHandlerError(400, "Invalid id");

    crawl(
      crawlProcess.id,
      { childState: crawlProcess.data },
      { ...crawlProcess.option, webhookOption });

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
      select: { state: true, data: true },
    });
    if (!crawlProcess)
      throw new RequestHandlerError(400, "Invalid id");

    return {
      status: 200,
      body: {
        state: crawlProcess.state,
        data: crawlProcess.data,
      },
    };
  },
});

// Get Output
crawlerRouter.use("/output", express.static("output"));

export default crawlerRouter;
