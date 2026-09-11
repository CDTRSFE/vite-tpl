import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createProject } from './create-project.mjs';

function run(args, cwd) {
    return new Promise((resolve, reject) => {
        const child = spawn('pnpm', args, { cwd, stdio: 'inherit', env: { ...process.env, HUSKY: '0' } });
        child.on('error', reject);
        child.on('exit', (code, signal) => {
            if (code === 0) resolve();
            else reject(new Error(`pnpm ${args.join(' ')} failed (${signal ?? code})`));
        });
    });
}

const temporary = await mkdtemp(path.join(tmpdir(), 'vite-tpl-check-'));
try {
    for (const template of ['pc', 'screen']) {
        console.log(`\n检查 ${template} 模板`);
        const target = await createProject({ template, target: path.join(temporary, template) });
        await run(['install', '--frozen-lockfile', '--ignore-scripts'], target);
        await run(['check'], target);
    }
} finally {
    await rm(temporary, { recursive: true, force: true });
}
