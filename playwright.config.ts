import { env } from './env';
import { defineConfig, devices } from '@playwright/test';
import { Tag } from './utils/tags';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: env.CI ? 2 : 0,
  workers: env.CI ? 2 : 1,
  reporter: [['html'], ['list']],
  grep: new RegExp(Tag.UI),
  use: {
    trace: 'retain-on-failure',
    headless: env.CI,
    baseURL: env.BASE_URL,
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
