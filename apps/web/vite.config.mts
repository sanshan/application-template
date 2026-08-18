/// <reference types='vitest' />
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const workspaceRoot = resolve(import.meta.dirname, '../..');
    const env = loadEnv(mode, workspaceRoot, '');
    const apiPort = Number(process.env.API_PORT ?? env.API_PORT ?? 3000);
    const webPort = Number(process.env.WEB_PORT ?? env.WEB_PORT ?? 4200);

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
