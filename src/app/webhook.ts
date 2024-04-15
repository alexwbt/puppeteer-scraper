import axios from "axios";
import { CrawlerStateData, WebhookOption } from "../lib/puppeteer/types";
import { CrawlState } from "@prisma/client";

export const createWebhookInstance = (option?: WebhookOption) => {
  const webhookClient = option && axios.create({
    baseURL: option.url,
    headers: option.headers,
  });

  const listensTo = (state: CrawlState) =>
    !option?.events || option.events.includes(state);

  const onEvent = async (id: number, status: CrawlState, data: CrawlerStateData) => {
    if (!webhookClient || !listensTo(status)) return;
    webhookClient.post("/", { id, status, data });
  };

  return { onEvent };
};
