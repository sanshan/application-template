import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src',
    use: {
        baseURL: 'http://localhost:4200',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'pnpm exec vite --host localhost --port 4200',
        cwd: '../web',
        url: 'http://localhost:4200',
        reuseExistingServer: true,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
