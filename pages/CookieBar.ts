import { type Page, type Locator } from "@playwright/test";

export class CookieBar {
    private readonly page: Page;
    private readonly container: Locator;
    private readonly continueWithoutAcceptingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator("[class^='CookiesBar_container']");
        this.continueWithoutAcceptingBtn = this.page.locator("button[class*='gtm-cookie-bar-decline']");
    }

    async continueWithoutAccepting() {
        await this.continueWithoutAcceptingBtn.click();
    }

    async isVisible(): Promise<boolean> {
        return await this.container.isVisible();
    }
}
