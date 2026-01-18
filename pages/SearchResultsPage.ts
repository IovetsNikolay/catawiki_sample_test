import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../env';


export class SearchResultsPage extends BasePage {
  
  protected pageUrl = 's';

  private lotCardContainerLocator = this.page.locator("[data-testid^='lot-card-container-']");

  async expectSearchResultsUrl(query: string) {
    const expectedUrl = `${env.BASE_URL}${this.pageUrl}?q=${query}`;
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async getAllLotCards(): Promise<LotCardContainer[]> {
    const locators = await this.lotCardContainerLocator.all();
    return locators.map(locator => new LotCardContainer(locator));
  }

  async getLotCardsCount(): Promise<number> {
    return this.lotCardContainerLocator.count();
  }

  async assertPageContainsCards(minCount: number) {
    await this.lotCardContainerLocator.first().waitFor({ state: 'visible' });
    const count = await this.getLotCardsCount();
    expect(count).toBeGreaterThan(minCount);
  }

  getLotCardByIndex(index: number): LotCardContainer {
    return new LotCardContainer(this.lotCardContainerLocator.nth(index));
  }

  async openLotCard(index: number): Promise<string> {
    const card = this.getLotCardByIndex(index);
    const cardName = await this.getLotCardText(card);
    console.log(`Clicking on card: "${cardName}"`);
    await card.root.click();
    return cardName;
  }

  async getLotCardText(card: LotCardContainer): Promise<string> {
    return card.title.innerText();
  }

}

class LotCardContainer {
  readonly root: Locator;
  readonly title: Locator;

  constructor(container: Locator) {
    this.root = container;
    this.title = container.locator("[class*='c-lot-card__title']");
  }
}


