import Joi, { Schema } from "joi";
import { Offset } from "puppeteer";
import { ClickOption, CrawlerPageOption, CrawlerWaitOption, ReuseTabOption, RootCrawlerPageOption, WebhookOption } from "../../lib/puppeteer/types";

const ClickOptionSchema = Joi.object<ClickOption>({
  jsClick: Joi.boolean(),
  button: Joi.string().valid("left", "right", "middle", "back", "forward"),
  delay: Joi.number().min(0),
  count: Joi.number().min(1),
  offset: Joi.object<Offset>({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }),
});

export const CrawlerWaitOptionSchema = Joi.object<CrawlerWaitOption>({
  timeout: Joi.number(),
  waitForSelector: Joi.string(),
  waitForAbsenceOfSelector: Joi.string(),

  clickIfExistSelector: Joi.string(),
  clickIfExistClickOption: ClickOptionSchema,
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
  contentSelector: Joi.string(),
  fieldSelector: Joi.object().pattern(Joi.string(), Joi.string()),

  linkSelector: Joi.string(),
  linkTriggerClickOption: ClickOptionSchema,
  linkTriggerWaitOption: CrawlerWaitOptionSchema,

  childrenPage: Joi.object().pattern(Joi.string(), Joi.link("#CrawlerPageSchema")),

  linkLoaderLimit: Joi.number().integer().positive(),
  linkLoaderSelector: Joi.string(),
  linkLoaderMethod: Joi.string().valid("windowScrollToBottom"),
  linkLoaderTriggerWaitOption: CrawlerWaitOptionSchema,
};
export const CrawlerPageSchema = Joi.object<CrawlerPageOption>(CrawlerPageSchemaContent).id("CrawlerPageSchema");

export const WebhookOptionSchema = Joi.object<WebhookOption>({
  url: Joi.string().required(),
  events: Joi.array().items(Joi.string().valid("RUNNING", "STOPPED", "COMPLETED", "ERROR")),
  headers: Joi.object().pattern(Joi.string(), Joi.string()),
  minOutputBatchSize: Joi.number().min(1),
  deduplicateOutput: Joi.boolean(),
});

export const RootCrawlerPageSchema = Joi.object<RootCrawlerPageOption>({
  ...CrawlerPageSchemaContent,

  url: Joi.string().required(),
  proxy: Joi.boolean(),
  webhookOption: WebhookOptionSchema,
  launchOption: Joi.object(),
  navigateOption: Joi.object(),
}).shared(CrawlerPageSchema);

export const GetCrawlerStateSchema = Joi.object<{ id: string }>({
  id: Joi.string().required(),
});
