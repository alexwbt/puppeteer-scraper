import { Page } from "puppeteer";

export default class CrawlerPageGetter {

  constructor(
    private getterFunction: () => Promise<Page | undefined>,
    private parentGetter?: CrawlerPageGetter,
    private linkLoaderIndex?: number,
    private linkElementHtml?: string,
    private tabIndex?: number,
  ) { }

  public getPage() {
    return this.getterFunction();
  }

  public getSteps(): string {
    if (!this.parentGetter)
      return "root";
    return `${this.parentGetter.getSteps()} -> ${this.linkElementHtml} (page: ${this.linkLoaderIndex}, tab:${this.tabIndex})`;
  }

}
