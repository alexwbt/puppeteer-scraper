import axios from "axios";
import { createWriteStream, promises as fs } from "fs";
import https from "https";
import { Page } from "puppeteer";
import CrawlerPageGetter from "./getter";
import { CrawlerStateData } from "./types";

async function downloadPDF(url: string, outputPath: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const writer = createWriteStream(outputPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

export type FieldSelector = {
  [key: string]: string;
};

export type FileType = "html" | "json" | "pdf";

export default class CrawlerOutput {

  constructor(
    private id: string,
    private state: CrawlerStateData,
    private outputDir: string = `./output/${id}`,
    private debugDir: string = `./output/debug`,
  ) { }

  public async init() {
    try { await fs.access(this.outputDir); }
    catch (e) { await fs.mkdir(this.outputDir, { recursive: true }); }

    try { await fs.access(this.debugDir); }
    catch (e) { await fs.mkdir(this.debugDir, { recursive: true }); }
  }

  private async getFieldContent(page: Page, fieldSelector: FieldSelector) {
    const output: Record<string, string> = {};
    for (const [key, selector] of Object.entries(fieldSelector)) {
      const elements = await page.$$(selector);
      output[key] = (await Promise.all(elements.map(element =>
        page.evaluate(e => e.innerHTML, element)))).join("");
    }
    return output;
  }

  private async getContent(page: Page, contentSelector?: string) {
    if (!contentSelector)
      return await page.content();

    const elements = await page.$$(contentSelector);
    const content = [];
    for (const element of elements)
      content.push(await page.evaluate(e => e.outerHTML, element));

    return content.join("");
  }

  public async save(
    page: Page,
    fieldSelector?: FieldSelector,
    contentSelector?: string,
  ) {
    const name = page.url().replace(/[&\/\\#,+()$~%.'":*?<>{}]+/g, "_").slice(0, 100);

    if (!this.state.savedCount) this.state.savedCount = {};
    const saveCount = this.state.savedCount[name] = (this.state.savedCount[name] || 0) + 1;

    const fileTypes: FileType[] = (() => {
      if (page.url().endsWith(".pdf")) return ["pdf"];
      if (fieldSelector) return ["html", "json"];
      return ["html"];
    })()

    const fileNames = await Promise.all(fileTypes.map(fileType => (async () => {
      const fileName = `${this.outputDir}/${name}_${saveCount}.${fileType}`;
      switch (fileType) {
        case "pdf":
          await downloadPDF(page.url(), fileName);
          break;
        case "html":
          await fs.writeFile(fileName, await this.getContent(page, contentSelector));
          break;
        case "json":
          const fieldContent = await this.getFieldContent(page, fieldSelector || {});
          const jsonString = JSON.stringify(fieldContent);
          await fs.writeFile(fileName, jsonString);
          break;
      }
      return fileName;
    })()));

    return fileNames;
  }

  public async debugLog(pageGetter: CrawlerPageGetter, message: string) {
    await fs.appendFile(`${this.debugDir}/${this.id}`, `[${pageGetter.getSteps()}] ${message}\n`);
  }

}
