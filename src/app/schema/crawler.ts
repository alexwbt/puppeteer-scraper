import Joi, { Schema } from "joi";
import { CrawlerPageOption, CrawlerWaitOption, ReuseTabOption, RootCrawlerPageOption } from "../../lib/puppeteer/crawl";

export const CrawlerWaitOptionSchema = Joi.object<CrawlerWaitOption>({
  timeout: Joi.number(),
  waitForSelector: Joi.string(),
  waitForAbsenceOfSelector: Joi.string(),

  clickIfExistSelector: Joi.string(),
  clickIfExistWaitOption: Joi.link().ref("#CrawlerWaitOptionSchema"),
}).id("CrawlerWaitOptionSchema");

export const ReuseTabOptionSchema = Joi.object<ReuseTabOption>({
  childrenBackMethod: Joi.string().required().valid("closeNewTab", "browserBack", "backSelector", "noAction"),
  childrenBackSelector: Joi.string(),
  childrenBackWaitOption: CrawlerWaitOptionSchema,
});

const CrawlerPageSchemaContent: Record<keyof CrawlerPageOption, Schema> = {
  waitOption: CrawlerWaitOptionSchema,

  reuseTab: ReuseTabOptionSchema,

  saveContent: Joi.boolean(),
  fieldSelector: Joi.object().pattern(Joi.string(), Joi.string()),

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
