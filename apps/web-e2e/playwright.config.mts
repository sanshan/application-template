import { defineConfig, devices } from '@playwright/test';

import { loadPlaywrightRuntimeConfig } from './playwright-runtime-config.mts';

const { webPort, webUrl } = loadPlaywrightRuntimeConfig();

export default defineConfig({
    testDir: './src',
    use: {
        baseURL: webUrl,
        trace: 'on-first-retry',
    },
    webServer: {
        command: `pnpm exec vite --host localhost --port ${webPort}`,
        cwd: '../web',
        url: webUrl,
        reuseExistingServer: true,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
