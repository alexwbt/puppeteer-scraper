import axios from "axios";
import { CrawlerStateData, WebhookOption } from "../lib/puppeteer/types";
import { CrawlState } from "@prisma/client";

export const createWebhookInstance = (
  option?: WebhookOption,
  initialWebhookState?: CrawlerStateData["webhookState"],
) => {
  const webhookClient = option && axios.create({
    baseURL: option.url,
    headers: option.headers,
  });
  const OUTPUT_EVENT_BATCH_SIZE = option?.minOutputBatchSize || 1;
  let sequenceNumber = initialWebhookState?.sequenceNumber || 1;
  let lastOutput = initialWebhookState?.lastOutput || [];
  let lastState = initialWebhookState?.lastState || undefined;

  const listensTo = (state: CrawlState) =>
    !option?.events || option.events.includes(state);

  const noChange = (state: CrawlState, data: CrawlerStateData) =>
    lastState === state &&
    (data.output?.length || 0) - lastOutput.length < OUTPUT_EVENT_BATCH_SIZE;

  const onEvent = async (
    id: number, state: CrawlState, data: CrawlerStateData
  ): Promise<CrawlerStateData["webhookState"]> => {
    if (!webhookClient || !listensTo(state) || noChange(state, data)) return;
    const output = option.deduplicateOutput
      ? (data.output || []).filter(o => !lastOutput.includes(o))
      : data.output || [];
    lastState = state;
    lastOutput.push(...output);

    // call webhook
    await webhookClient.post("/", {
      id,
      seq: sequenceNumber++,
      state,
      output,
      sourceMap: data.outputUrlMapping,
      error: data.error,
    });

    // return new state
    return { sequenceNumber, lastOutput, lastState };
  };

  return { onEvent };
};
