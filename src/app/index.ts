import { CrawlState } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import { ENV } from "../lib/util/env";
import logger from "../lib/util/logger";
import { prismaClient } from "./prisma";
import crawlerRouter from "./router/crawler";
import notfoundRouter from "./router/notfound";
import { crawl } from "./crawl";

const app = express();
app.use(bodyParser.json());

const rootRouter = express.Router();
rootRouter.use("/crawler", crawlerRouter);
rootRouter.use(notfoundRouter);

const startApp = (
  port: number,
  contextPath: string,
) => {
  app.use(contextPath, rootRouter);

  app.listen(port, () => {
    logger.info(`Running Server. (PORT: ${port}, `
      + `CONTEXT_PATH: ${contextPath}, `
      + `LOG_LEVEL: ${logger.level}, `
      + `ENV: ${ENV})`);
  });

  // resume all running crawlers
  (async () => {
    const runningProcesses = await prismaClient.crawl.findMany({
      where: { state: CrawlState.RUNNING },
    });
    for (const process of runningProcesses) {
      const state = { childState: process.data };
      crawl(process.id, state, process.option);
    }
  })();
};

export default startApp;
