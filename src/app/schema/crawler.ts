import Joi from "joi";
import { CrawlerPageOption, CrawlerWaitOption, RootCrawlerPageOption } from "../../lib/puppeteer/crawl";

export const CrawlerWaitOptionSchema = Joi.object<CrawlerWaitOption>({
  timeout: Joi.number(),
  waitForSelector: Joi.string(),
  waitForAbsenceOfSelector: Joi.string(),

  clickIfExistSelector: Joi.string(),
  clickIfExistWaitOption: Joi.link().ref("#CrawlerWaitOptionSchema"),
}).id("CrawlerWaitOptionSchema");

const CrawlerPageSchemaContent = {
  waitOption: CrawlerWaitOptionSchema,

  saveContent: Joi.boolean(),
  contentSelector: Joi.string(),

  linkSelector: Joi.string(),
  linkTriggerWaitOption: CrawlerWaitOptionSchema,

  childrenPage: Joi.object().pattern(Joi.string(), Joi.link("#CrawlerPageSchema")),

  linkLoaderLimit: Joi.number().integer().positive(),
  linkLoaderSelector: Joi.string(),
  linkLoaderMethod: Joi.string().valid("windowScrollToBottom"),
  linkLoaderTriggerWaitOption: CrawlerWaitOptionSchema,
};
export const CrawlerPageSchema = Joi.object<CrawlerPageOption>(CrawlerPageSchemaContent).id("CrawlerPageSchema");

export const RootCrawlerPageSchema = Joi.object<RootCrawlerPageOption>({
  ...CrawlerPageSchemaContent,

  url: Joi.string().required(),

  launchOption: Joi.object(),
  navigateOption: Joi.object(),
}).shared(CrawlerPageSchema);

export const GetCrawlerStateSchema = Joi.object<{ id: string }>({
  id: Joi.string().required(),
});
