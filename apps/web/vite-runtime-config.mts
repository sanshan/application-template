import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { z } from 'zod';

const WebRuntimeEnvSchema = z.object({
    API_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    WEB_PORT: z.coerce.number().int().min(1).max(65535).default(4200),
});

export function loadWebRuntimeConfig(mode: string) {
    const workspaceRoot = resolve(import.meta.dirname, '../..');
    const env = loadEnv(mode, workspaceRoot, '');
    const runtimeEnv = WebRuntimeEnvSchema.parse({
        API_PORT: process.env.API_PORT ?? env.API_PORT,
        WEB_PORT: process.env.WEB_PORT ?? env.WEB_PORT,
    });

    return {
        apiPort: runtimeEnv.API_PORT,
        webPort: runtimeEnv.WEB_PORT,
    };
}
