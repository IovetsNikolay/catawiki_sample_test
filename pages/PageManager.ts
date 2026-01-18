import { Page } from '@playwright/test';
import { MainPage } from './MainPage';
import { SearchResultsPage } from './SearchResultsPage';
import { LotPage } from './LotPage';

export class PageManager {
  readonly page: Page;
  private _pages = new Map<string, any>();

  constructor(page: Page) {
    this.page = page;
  }

  private getLazy<T>(key: string, factory: () => T): T {
    if (!this._pages.has(key)) {
      this._pages.set(key, factory());
    }
    return this._pages.get(key) as T;
  }

  get mainPage(): MainPage {
    return this.getLazy('mainPage', () => new MainPage(this.page));
  }

  get searchResultsPage(): SearchResultsPage {
    return this.getLazy('searchResultsPage', () => new SearchResultsPage(this.page));
  }

  get lotPage(): LotPage {
    return this.getLazy('lotPage', () => new LotPage(this.page));
  }
}
