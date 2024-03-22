import dayjs from "dayjs";
import express from "express";
import crawl from "../../lib/puppeteer/crawl";
import { useRequestHandler } from "../../lib/router/useRequestHandler";
import { RootCrawlerPageSchema } from "../schema/crawler";

const crawlerRouter = express.Router();

useRequestHandler({
  router: crawlerRouter,
  method: "post",
  path: "/crawl",
  bodySchema: RootCrawlerPageSchema,
  requestHandler: ({ body }) => {

    const id = dayjs().format("MMDDHHmmss");
    crawl(body, id);

    return {
      status: 200,
      body: {
        message: `Triggered crawler. (id: ${id})`,
      },
    };
  },
});

export default crawlerRouter;
