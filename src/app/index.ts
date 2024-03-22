import bodyParser from "body-parser";
import express from "express";
import logger from "../lib/util/logger";
import crawlerRouter from "./router/crawler";
import notfoundRouter from "./router/notfound";

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
    logger.info(`Running Server. (PORT: ${port}, CONTEXT_PATH: ${contextPath})`);
  });
};

export default startApp;