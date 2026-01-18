import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { MainPage } from '../pages/MainPage';

type PagesFixture = {
  pages: PageManager;
};

export const test = base.extend<PagesFixture>({
  pages: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    // Precondition: navigate to main page and handle cookie bar if visible
    const mainPage = new MainPage(page);
    await mainPage.continueWithoutAcceptingCookies();
    //Continue execution flow
    await use(pageManager);
    //After execution
  },
});

export { expect } from '@playwright/test';
