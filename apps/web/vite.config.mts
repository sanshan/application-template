/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { loadWebRuntimeConfig } from './vite-runtime-config';

export default defineConfig(({ mode }) => {
    const { apiPort, webPort } = loadWebRuntimeConfig(mode);

    return {
        root: import.meta.dirname,
        cacheDir: '../../node_modules/.vite/apps/web',
        server: {
            port: webPort,
            host: 'localhost',
            proxy: {'/api': {target: `http://localhost:${apiPort}`, changeOrigin: true}},
        },
        preview: {port: webPort, host: 'localhost'},
        plugins: [react()],
        build: {
            outDir: './dist',
            emptyOutDir: true,
            reportCompressedSize: true,
            commonjsOptions: {transformMixedEsModules: true},
        },
        test: {
            name: 'web',
            watch: false,
            globals: true,
            environment: 'jsdom',
            passWithNoTests: true,
            setupFiles: ['./src/test/setup.ts'],
            include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            reporters: ['default'],
            coverage: {reportsDirectory: './test-output/vitest/coverage', provider: 'v8' as const},
        },
    };
});
