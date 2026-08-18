import { spawn, spawnSync } from 'node:child_process';

const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

function runNx(target) {
    const result = spawnSync(pnpm, ['nx', 'run', target], {
        env: process.env,
        stdio: 'inherit',
    });

    if (result.status !== 0) {
        process.exitCode = result.status ?? 1;
        throw new Error(`Nx target failed: ${target}`);
    }
}

function waitForExit(child, timeoutMs = 5000) {
    if (child.exitCode !== null || child.signalCode !== null) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            child.kill('SIGKILL');
        }, timeoutMs);

        child.once('exit', () => {
            clearTimeout(timeout);
            resolve();
        });
    });
}

runNx('@application-template/api:migration:run');
runNx('@application-template/api:build');

const apiProcess = spawn(process.execPath, ['apps/api/dist/main.js'], {
    env: process.env,
    stdio: 'inherit',
});

try {
    runNx('@application-template/api-e2e:jest');
} finally {
    if (apiProcess.exitCode === null && apiProcess.signalCode === null) {
        apiProcess.kill('SIGTERM');
    }

    await waitForExit(apiProcess);
}
