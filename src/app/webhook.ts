import axios from "axios";
import { CrawlerStateData, WebhookOption } from "../lib/puppeteer/types";
import { CrawlState } from "@prisma/client";

export const createWebhookInstance = (option?: WebhookOption) => {
  const webhookClient = option && axios.create({
    baseURL: option.url,
    headers: option.headers,
  });
  const OUTPUT_EVENT_BATCH_SIZE = option?.outputEventBatchSize || 0;
  let sequenceNumber = 1;
  let lastOutputSize = 0;
  let lastState: CrawlState | undefined = undefined;

  const listensTo = (state: CrawlState) =>
    !option?.events || option.events.includes(state);

  const noChange = (state: CrawlState, data: CrawlerStateData) =>
    lastState === state &&
    (data.output?.length || 0) - lastOutputSize <= OUTPUT_EVENT_BATCH_SIZE;

  const onEvent = async (id: number, state: CrawlState, data: CrawlerStateData) => {
    if (!webhookClient || !listensTo(state) || noChange(state, data)) return;
    lastState = state;
    lastOutputSize = data.output?.length || 0;
    await webhookClient.post("/", {
      id,
      seq: sequenceNumber++,
      state,
      output: data.output || [],
    });
  };

  return { onEvent };
};
