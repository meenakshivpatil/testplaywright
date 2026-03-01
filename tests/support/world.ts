import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";

export type WorldParams = {
  headless?: boolean;
  baseUrl?: string;
};

export class PWWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  params: WorldParams;

  constructor(options: IWorldOptions) {
    super(options);
    this.params = (options.parameters ?? {}) as WorldParams;
  }

  async init() {
    const headless = this.params.headless ?? true;
    this.browser = await chromium.launch({ headless, timeout: 30_000 });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async dispose() {
    await this.context?.close().catch(() => {});
    await this.browser?.close().catch(() => {});
  }

  baseUrl() {
    return this.params.baseUrl ?? "https://sdss.org/dr19/";
  }
}

setWorldConstructor(PWWorld);