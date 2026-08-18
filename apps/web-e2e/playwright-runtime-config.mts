import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { z } from 'zod';

const VITE_MODE = 'development';
const PlaywrightRuntimeEnvSchema = z.object({
    WEB_PORT: z.coerce.number().int().min(1).max(65535).default(4200),
});

export function loadPlaywrightRuntimeConfig() {
    const workspaceRoot = resolve(import.meta.dirname, '../..');
    const env = loadEnv(VITE_MODE, workspaceRoot, '');
    const runtimeEnv = PlaywrightRuntimeEnvSchema.parse({
        WEB_PORT: process.env.WEB_PORT ?? env.WEB_PORT,
    });

    return {
        webPort: runtimeEnv.WEB_PORT,
        webUrl: `http://localhost:${runtimeEnv.WEB_PORT}`,
    };
}
