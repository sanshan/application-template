import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from 'vite';

const workspaceRoot = resolve(import.meta.dirname, '../..');
const mode = process.env.NODE_ENV ?? 'development';
const env = loadEnv(mode, workspaceRoot, '');
const webPort = Number(process.env.WEB_PORT ?? env.WEB_PORT ?? 4200);
const webUrl = `http://localhost:${webPort}`;

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
