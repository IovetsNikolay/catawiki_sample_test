import { type Page } from "@playwright/test";
import { CookieBar } from "./CookieBar";

//abstract base page class for common methods and page initialization
export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async continueWithoutAcceptingCookies() {
        if (await this.isCookieBarVisible()) {
            console.log('Dismissing cookie bar');
            const cookieBar = new CookieBar(this.page);
            await cookieBar.continueWithoutAccepting();    
        }
    }

    protected async isCookieBarVisible(): Promise<boolean> {
        const cookieBar = new CookieBar(this.page);
        return await cookieBar.isVisible();
    }

}
