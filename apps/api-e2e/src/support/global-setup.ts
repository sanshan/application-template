import { waitForPortOpen } from '@nx/node/utils';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
    const host = process.env.HOST ?? 'localhost';
    const port = Number(process.env.API_PORT ?? 3000);
    await waitForPortOpen(port, { host });
    globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
