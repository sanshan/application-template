import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const DEFAULT_WEB_PORT = 4200;
const VITE_MODE = 'development';

function parsePort(name: 'WEB_PORT', value: string | undefined, fallback: number): number {
    const rawValue = value ?? String(fallback);
    const port = Number(rawValue);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error(`${name} must be an integer between 1 and 65535`);
    }

    return port;
}

export function loadPlaywrightRuntimeConfig() {
    const workspaceRoot = resolve(import.meta.dirname, '../..');
    const env = loadEnv(VITE_MODE, workspaceRoot, '');
    const webPort = parsePort('WEB_PORT', process.env.WEB_PORT ?? env.WEB_PORT, DEFAULT_WEB_PORT);

    return {
        webPort,
        webUrl: `http://localhost:${webPort}`,
    };
}
