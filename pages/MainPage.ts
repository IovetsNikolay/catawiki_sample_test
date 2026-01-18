import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  protected pageUrl = '/';

  private searchInput = this.page.locator("input#field_r_2_");
  private searchBtn = this.page.locator("[class^='c-header__search__main-wrapper'] [aria-label='Search']");

  public async search(keyword: string) {
    console.log(`Searching for: "${keyword}"`);
    await this.searchInput.fill(keyword);
    await this.searchBtn.click();
  }

  public async navigate() {
    console.log('Navigating to main page');
    await this.page.goto(this.pageUrl);
  }   

}
