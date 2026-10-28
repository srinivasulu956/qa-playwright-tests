import { defineConfig, devices } from '@playwright/test';

const LOCAL_APP_URL = 'http://localhost:5300';
const baseURL = process.env.BASE_URL || LOCAL_APP_URL;
const isDeployedApp = Boolean(process.env.BASE_URL);
const DEPLOYED_APP_WORKERS = 2;

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    workers: isDeployedApp ? DEPLOYED_APP_WORKERS : undefined,
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
    webServer: isDeployedApp
        ? undefined
        : {
              command: 'npm run build && npm run preview',
              cwd: '../tms-demo-app',
              url: LOCAL_APP_URL,
              reuseExistingServer: true,
              timeout: 120000,
          },
});
