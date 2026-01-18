# Catawiki Test Automation

Automated end-to-end tests for Catawiki website using Playwright with TypeScript.

## Assignment Overview

This project automates the following scenario:
1. Open Catawiki main page
2. Search for "trains" using the search field
3. Verify search results page is displayed
4. Click on the second lot in search results
5. Verify lot page opens with lot details (name, favorites counter, current bid)
6. Print lot details to console

## Project Structure

```
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions CI workflow
├── env/
│   └── index.ts              # Environment variables configuration
├── fixtures/
│   └── pages.ts              # Playwright test fixtures with stealth mode
├── pages/
│   ├── BasePage.ts           # Abstract base page with common methods
│   ├── CookieBar.ts          # Cookie consent bar component
│   ├── LotPage.ts            # Lot details page object
│   ├── MainPage.ts           # Main/home page object
│   ├── PageManager.ts        # Lazy-loading page object manager
│   └── SearchResultsPage.ts  # Search results page with lot card components
├── tests/
│   └── lot_search_flow.spec.ts  # Main test scenario
├── utils/
│   └── tags.ts               # Test tags for filtering
├── playwright.config.ts      # Playwright configuration
├── package.json
└── tsconfig.json
```

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **Playwright** | End-to-end testing framework |
| **TypeScript** | Type-safe JavaScript |
| **Page Object Model** | Design pattern for maintainable tests |
| **playwright-extra** | Stealth mode to bypass bot detection |
| **envalid** | Environment variable validation |
| **GitHub Actions** | CI/CD pipeline |

## Key Design Patterns

- **Page Object Model (POM)**: Each page has a dedicated class with locators and methods
- **Lazy Loading**: PageManager initializes page objects only when accessed
- **Component Pattern**: LotCardContainer as a nested component within SearchResultsPage
- **Fixtures**: Custom Playwright fixtures for shared setup/teardown

## Prerequisites

- Node.js 18+ 
- npm

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd catawiki_sample_test

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests Locally

```bash
# Run all tests (headless)
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with Playwright UI
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run specific project (browser)
npm test -- --project=chromium-ui
```

## CI/CD (GitHub Actions)

Tests run automatically on:
- Push to `main` or `master` branch
- Pull requests to `main` or `master`
- Manual trigger via workflow_dispatch

### Workflow Features

- Multi-browser testing (Chromium, Firefox, WebKit)
- HTML report artifact upload
- Automatic retry on failure (2 retries in CI)
- Stealth mode to minimize bot detection

### View CI Results

1. Go to repository → Actions tab
2. Click on the workflow run
3. Download `playwright-report` artifact for detailed HTML report

## Test Reports

After running tests locally, view the HTML report:

```bash
npx playwright show-report
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Run with Playwright UI |
| `npm run test:debug` | Run in debug mode |
