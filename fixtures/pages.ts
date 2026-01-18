import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';
import { chromium as playwrightExtra } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { PageManager } from '../pages/PageManager';
import { MainPage } from '../pages/MainPage';
import { env } from '../env';

// Add stealth plugin
playwrightExtra.use(StealthPlugin());

type StealthFixture = {
  stealthContext: BrowserContext;
  stealthPage: Page;
  pages: PageManager;
};

export const test = base.extend<StealthFixture>({
  stealthContext: async ({}, use) => {
    const browser = await playwrightExtra.launch({
      headless: env.CI,
    });
    const context = await browser.newContext({
      locale: 'en-US',
      timezoneId: 'Europe/Amsterdam',
      extraHTTPHeaders: {
        'Accept-Language': 'en-US,en;q=0.9,nl;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    await use(context);
    await browser.close();
  },

  stealthPage: async ({ stealthContext }, use) => {
    const page = await stealthContext.newPage();
    await use(page);
  },

  pages: async ({ stealthPage }, use) => {
    const pageManager = new PageManager(stealthPage);
    const mainPage = new MainPage(stealthPage);
    await mainPage.continueWithoutAcceptingCookies();
    await use(pageManager);
  },
});

export { expect } from '@playwright/test';
