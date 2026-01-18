import { test, expect } from '../fixtures/pages';
import { Tag } from '../utils/tags';

test.describe('UI Tests', { tag: Tag.UI }, () => {

  test('open main page', async ({ pages }) => {

    const searchQuery = 'trains';

    await pages.mainPage.navigate();
    await pages.mainPage.continueWithoutAcceptingCookies();
    await pages.mainPage.search(searchQuery);

    await pages.searchResultsPage.expectSearchResultsUrl(searchQuery);
    await pages.searchResultsPage.assertPageContainsCards(2);
    await pages.searchResultsPage.openLotCard(1);

    await pages.lotPage.expectLotPageUrl();
    await pages.lotPage.printLotDetails();
    
  });
});
