import { defineConfig, devices } from '@playwright/test';

const LOCAL_APP_URL = 'http://localhost:5300';
const baseURL = process.env.BASE_URL || LOCAL_APP_URL;

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'setup', testMatch: /.*\.setup\.js/ },
        { name: 'chromium', use: { ...devices['Desktop Chrome'] }, dependencies: ['setup'] },
    ],
    webServer: process.env.BASE_URL
        ? undefined
        : {
              command: 'npm run build && npm run preview',
              cwd: '../tms-demo-app',
              url: LOCAL_APP_URL,
              reuseExistingServer: true,
              timeout: 120000,
          },
});
