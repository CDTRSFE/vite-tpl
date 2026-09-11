import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const script = path.join(root, 'scripts/create-project.mjs');
const read = (dir, file) => readFile(path.join(dir, file), 'utf8');
const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });

async function temporary(t) {
    const dir = await mkdtemp(path.join(tmpdir(), 'vite-tpl-test-'));
    t.after(() => rm(dir, { recursive: true, force: true }));
    return dir;
}

for (const [type, library, other] of [
    ['pc', 'ant-design-vue', 'naive-ui'],
    ['screen', 'naive-ui', 'ant-design-vue'],
]) {
    test(`${type}: generates an independent project with only the selected UI library`, async (t) => {
        const dir = await temporary(t);
        const target = path.join(dir, 'project with spaces');
        const result = run('--template', type, '--target', target, '--name', 'example-app');
        assert.equal(result.status, 0, result.stderr);
        const pkg = JSON.parse(await read(target, 'package.json'));
        assert.equal(pkg.name, 'example-app');
        assert.ok(pkg.dependencies[library]);
        assert.equal(pkg.dependencies[other], undefined);
        assert.ok(pkg.dependencies.vue);
        assert.ok(pkg.scripts.dev);
        assert.ok(pkg.scripts.check);
        assert.ok((await read(target, 'src/components/EchartsCom.vue')).length);
        assert.ok((await read(target, 'docs/requirements/README.md')).length);
        const components = await readdir(path.join(target, 'src/components'));
        assert.equal(components.includes('ScaleLayout.vue'), type === 'screen');
        assert.equal(components.includes('ScaleLayout.test.ts'), type === 'screen');
        for (const absent of ['templates', 'scripts', '.git', 'node_modules']) {
            assert.equal((await readdir(target)).includes(absent), false, absent);
        }
        assert.deepEqual(await readdir(path.join(target, 'docs/requirements')), ['README.md']);
        for (const file of ['AGENTS.md', 'docs/ui-design-guidelines.md', 'src/App.vue', 'src/types/global.d.ts', 'ui.config.ts', 'tsconfig.json']) {
            assert.equal((await read(target, file)).includes(other), false, `${file}: unexpected ${other}`);
        }
    });
}

test('accepts an existing empty target and works from another working directory', async (t) => {
    const target = await temporary(t);
    const result = spawnSync(process.execPath, [script, '--template', 'pc', '--target', target], {
        cwd: tmpdir(), encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr);
    assert.ok(JSON.parse(await read(target, 'package.json')).name);
});

test('rejects a nonempty target without changing its files', async (t) => {
    const target = await temporary(t);
    await writeFile(path.join(target, 'keep.txt'), 'user content');
    const result = run('--template', 'screen', '--target', target);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /非空/);
    assert.deepEqual(await readdir(target), ['keep.txt']);
    assert.equal(await read(target, 'keep.txt'), 'user content');
});

test('rejects missing, invalid and unknown arguments before creating output', async (t) => {
    const dir = await temporary(t);
    const target = path.join(dir, 'output');
    for (const args of [[], ['--template', 'mobile'], ['--template', 'pc', '--typo', 'screen']]) {
        const result = run(...args, '--target', target);
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /template|参数/);
    }
    assert.deepEqual(await readdir(dir), []);
    assert.notEqual(run('--template', 'pc').status, 0);
});

test('rejects output inside template sources, including symlink aliases', async (t) => {
    const dir = await temporary(t);
    const alias = path.join(dir, 'alias');
    await symlink(path.join(root, 'templates'), alias, 'dir');
    for (const target of [path.join(root, 'templates/new-output'), path.join(alias, 'new-output')]) {
        const result = run('--template', 'pc', '--target', target);
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /模板目录/);
    }
});

test('does not overwrite a file or a target symlink', async (t) => {
    const dir = await temporary(t);
    const file = path.join(dir, 'file');
    const empty = path.join(dir, 'empty');
    const link = path.join(dir, 'link');
    await writeFile(file, 'keep');
    await mkdir(empty);
    await symlink(empty, link, 'dir');
    for (const target of [file, link]) {
        assert.notEqual(run('--template', 'pc', '--target', target).status, 0);
    }
    assert.equal(await readFile(file, 'utf8'), 'keep');
    assert.deepEqual(await readdir(empty), []);
});
