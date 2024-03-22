import axios from "axios";
import { createWriteStream, promises as fs } from "fs";
import https from "https";
import { Page } from "puppeteer";
import CrawlerPageGetter from "./getter";

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

export default class CrawlerOutput {

  private savedCount: { [name: string]: number } = {};

  constructor(
    private id: string,
    private outputDir: string = `./output/${id}`,
    private debugDir: string = `./output/debug`,
  ) { }

  public async init() {
    try { await fs.access(this.outputDir); }
    catch (e) { await fs.mkdir(this.outputDir, { recursive: true }); }

    try { await fs.access(this.debugDir); }
    catch (e) { await fs.mkdir(this.debugDir, { recursive: true }); }
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

  public async save(page: Page, contentSelector?: string) {
    const name = page.url().replace(/[&\/\\#,+()$~%.'":*?<>{}]+/g, "_").slice(0, 100);
    this.savedCount[name] = (this.savedCount[name] || 0) + 1;

    const fileType = page.url().endsWith(".pdf") ? "pdf" : "html";
    const fileName = `${this.outputDir}/${name}_${this.savedCount[name]}.${fileType}`;

    switch (fileType) {
      case "pdf":
        await downloadPDF(page.url(), fileName);
        break;
      case "html":
        const content = await this.getContent(page, contentSelector);
        await fs.writeFile(fileName, content);
        break;
    }

    return fileName;
  }

  public async debugLog(pageGetter: CrawlerPageGetter, message: string) {
    await fs.appendFile(`${this.debugDir}/${this.id}`, `[${pageGetter.getSteps()}] ${message}\n`);
  }

}
