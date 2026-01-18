import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../env';


export class LotPage extends BasePage {
  protected pageUrl = 'l/';
  
  private lotTitle = this.page.locator("[class^='LotTitle_main-title']>h1");

  async expectLotPageUrl() {
    await expect(this.page).toHaveURL(new RegExp(`^${env.BASE_URL}${this.pageUrl}`));
  }
  private lotBidAmount = this.page.locator("[data-testid='lot-bid-status-section']  [class^='LotBidStatusSection_bid-amount']");
  private lotFavoriteAmount = this.page.locator("[class*='be-lot-details__main-content-wrapper'] [class*='FavoriteChip_count']");

  async printLotDetails() {
    const title = await this.lotTitle.innerText();
    const bidAmount = await this.lotBidAmount.innerText();
    const favoriteAmount = await this.lotFavoriteAmount.innerText();

    console.log('=== Lot Details ===');
    console.log(`Title: ${title}`);
    console.log(`Bid Amount: ${bidAmount}`);
    console.log(`Favorites: ${favoriteAmount}`);
  }
}


