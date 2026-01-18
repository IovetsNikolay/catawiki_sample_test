import { env } from './env';
import { defineConfig, devices } from '@playwright/test';
import { Tag } from './utils/tags';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: env.CI ? 2 : 0,
  workers: '80%',
  reporter: [['html'], ['list']],
  grep: new RegExp(Tag.UI),
  use: {
    trace: 'retain-on-failure',
    headless: env.CI,
    baseURL: env.BASE_URL,
    locale: 'en-US',
    timezoneId: 'Europe/Amsterdam',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9,nl;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  },

  projects: [
    {
      name: 'chromium-ui',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox-ui',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit-ui',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
