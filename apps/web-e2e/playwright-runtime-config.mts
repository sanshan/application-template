import { PortsEnvSchema } from '@application-template/runtime-config';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const VITE_MODE = 'development';
const PlaywrightRuntimeEnvSchema = PortsEnvSchema.pick({
    WEB_PORT: true,
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
