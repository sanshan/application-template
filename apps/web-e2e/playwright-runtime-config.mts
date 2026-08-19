import { runtimeConfig } from '@application-template/runtime-config';

export function loadPlaywrightRuntimeConfig() {
    const { port: webPort } = runtimeConfig.web;

    return {
        webPort,
        webUrl: `http://localhost:${webPort}`,
    };
}
