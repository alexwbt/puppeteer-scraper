import dayjs from "dayjs";
import express from "express";
import crawl, { CrawlerState } from "../../lib/puppeteer/crawl";
import { useRequestHandler } from "../../lib/router/useRequestHandler";
import { GetCrawlerStateSchema, RootCrawlerPageSchema } from "../schema/crawler";
import RequestHandlerError from "../../lib/error/RequestHandlerError";

const crawlerRouter = express.Router();

const crawlerStates: {
  [id: string]: CrawlerState
} = {};

useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/crawl",
  bodySchema: RootCrawlerPageSchema,
  requestHandler: ({ body }) => {

    const id = dayjs().format("MMDDHHmmssSSS");
    crawlerStates[id] = { childState: { completed: false } };

    crawl(crawlerStates[id], body, id);

    return {
      status: 200,
      body: { id },
    };
  },
});

useRequestHandler({
  router: crawlerRouter,
  method: "get",
  path: "/state/:id",
  paramsSchema: GetCrawlerStateSchema,
  requestHandler: ({ params: { id } }) => {

    if (!crawlerStates[id])
      throw new RequestHandlerError(400, "Invalid id");

    return {
      status: 200,
      body: { state: crawlerStates[id].childState },
    };
  },
});

crawlerRouter.use("/output", express.static("output"));

export default crawlerRouter;
