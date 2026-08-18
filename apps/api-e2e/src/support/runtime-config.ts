const DEFAULT_API_PORT = 3000;
const DEFAULT_HOST = 'localhost';

function parsePort(value: string | undefined): number {
    const port = Number(value ?? DEFAULT_API_PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error('API_PORT must be an integer between 1 and 65535');
    }

    return port;
}

export function getApiE2eRuntimeConfig() {
    const host = process.env.HOST ?? DEFAULT_HOST;
    const port = parsePort(process.env.API_PORT);

    return {
        host,
        port,
        baseUrl: `http://${host}:${port}`,
    };
}
