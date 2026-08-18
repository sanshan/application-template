import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const DEFAULT_API_PORT = 3000;
const DEFAULT_WEB_PORT = 4200;

function parsePort(name: 'API_PORT' | 'WEB_PORT', value: string | undefined, fallback: number): number {
    const rawValue = value ?? String(fallback);
    const port = Number(rawValue);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error(`${name} must be an integer between 1 and 65535`);
    }

    return port;
}

export function loadWebRuntimeConfig(mode: string) {
    const workspaceRoot = resolve(import.meta.dirname, '../..');
    const env = loadEnv(mode, workspaceRoot, '');

    return {
        apiPort: parsePort('API_PORT', process.env.API_PORT ?? env.API_PORT, DEFAULT_API_PORT),
        webPort: parsePort('WEB_PORT', process.env.WEB_PORT ?? env.WEB_PORT, DEFAULT_WEB_PORT),
    };
}
