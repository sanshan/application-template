import { PortsEnvSchema } from '@application-template/runtime-config';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

export function loadWebRuntimeConfig(mode: string) {
    const workspaceRoot = resolve(import.meta.dirname, '../..');
    const env = loadEnv(mode, workspaceRoot, '');
    const runtimeEnv = PortsEnvSchema.parse({
        API_PORT: process.env.API_PORT ?? env.API_PORT,
        WEB_PORT: process.env.WEB_PORT ?? env.WEB_PORT,
    });

    return {
        apiPort: runtimeEnv.API_PORT,
        webPort: runtimeEnv.WEB_PORT,
    };
}
