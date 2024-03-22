import Joi from "joi";
import { CrawlerPageOption, CrawlerWaitOption, RootCrawlerPageOption } from "../../lib/puppeteer/crawl";

export const CrawlerWaitOptionSchema = Joi.object<CrawlerWaitOption>({
  timeout: Joi.number(),
  waitForSelector: Joi.string(),
  waitForAbsenceOfSelector: Joi.string(),

  clickIfExistSelector: Joi.string(),
  clickIfExistWaitOption: Joi.link().ref("#CrawlerWaitOptionSchema"),
}).id("CrawlerWaitOptionSchema");

export const CrawlerPageSchema = Joi.object<CrawlerPageOption>({
  waitOption: CrawlerWaitOptionSchema,

  saveContent: Joi.boolean(),
  contentSelector: Joi.string(),

  linkSelector: Joi.string(),
  linkTriggerWaitOption: CrawlerWaitOptionSchema,

  childrenPage:Joi.object().pattern(Joi.string(), Joi.link("/")),

  linkLoaderLimit: Joi.number().integer().positive(),
  linkLoaderSelector: Joi.string(),
  linkLoaderMethod: Joi.string().valid("windowScrollToBottom"),
  linkLoaderTriggerWaitOption: CrawlerWaitOptionSchema,
});

export const RootCrawlerPageSchema = CrawlerPageSchema.append<RootCrawlerPageOption>({
  url: Joi.string(),
});
