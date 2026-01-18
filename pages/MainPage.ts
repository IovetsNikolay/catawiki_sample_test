import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  protected pageUrl = '/';

  private mainContent = this.page.locator('#__next');
  private searchInput = this.page.locator("input#field_r_2_");
  private searchBtn = this.page.locator("[class^='c-header__search__main-wrapper'] [aria-label='Search']");

  public async assertPageLoaded() {
    const isLoaded = await this.mainContent.isVisible({ timeout: 10000 }).catch(() => false);
    if (!isLoaded) {
      throw new Error('Main page was not opened. The page may be blocked (Access Denied) or failed to load.');
    }
    console.log('Main page loaded successfully');
  }

  public async search(keyword: string) {
    console.log(`Searching for: "${keyword}"`);
    await this.searchInput.fill(keyword);
    await this.searchBtn.click();
  }

  public async navigate() {
    console.log('Navigating to main page');
    await this.page.goto(this.pageUrl);
    await this.assertPageLoaded();
  }   

}
