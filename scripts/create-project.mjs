import { cp, lstat, mkdir, readFile, readdir, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const templates = fileURLToPath(new URL('../templates/', import.meta.url));
const excluded = new Set(['package.json', 'node_modules', '.git', '.DS_Store', 'dist', 'coverage', 'components.d.ts', 'playwright-report', 'test-results']);

async function canonicalPath(target) {
    try {
        return await realpath(target);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        return path.join(await canonicalPath(path.dirname(target)), path.basename(target));
    }
}

export async function createProject({ template, target, name }) {
    if (!['pc', 'screen'].includes(template)) {
        throw new Error('参数 --template 必须为 pc 或 screen。');
    }
    if (!target?.trim()) throw new Error('参数 --target 必须指定目标目录。');
    const destination = path.resolve(target);
    const physicalTarget = await canonicalPath(destination);
    const source = await realpath(templates);
    const relative = path.relative(source, physicalTarget);
    if (relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) {
        throw new Error('不能在模板目录内生成工程。');
    }
    const info = await lstat(destination).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
        return undefined;
    });
    if (info && (!info.isDirectory() || info.isSymbolicLink())) {
        throw new Error('目标必须是普通目录，不能是文件或符号链接。');
    }
    if (info && (await readdir(destination)).length > 0) {
        throw new Error('目标目录非空，拒绝覆盖已有文件。');
    }
    const packageName = name ?? (path.basename(destination).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^[._-]+/, '') || 'my-project');
    if (!/^[a-z0-9][a-z0-9._-]*$/.test(packageName)) {
        throw new Error('参数 --name 请使用小写字母、数字、点、下划线或连字符，且以字母或数字开头。');
    }
    const base = path.join(templates, 'base');
    const variant = path.join(templates, template);
    const pkg = JSON.parse(await readFile(path.join(base, 'package.json'), 'utf8'));
    const overrides = JSON.parse(await readFile(path.join(variant, 'package.json'), 'utf8'));
    for (const key of ['scripts', 'dependencies', 'devDependencies']) {
        if (overrides[key]) pkg[key] = { ...pkg[key], ...overrides[key] };
    }
    pkg.name = packageName;
    await mkdir(destination, { recursive: true });
    for (const directory of [base, variant]) {
        await cp(directory, destination, {
            recursive: true,
            filter: (file) => !excluded.has(path.basename(file)),
        });
    }
    await writeFile(path.join(destination, 'package.json'), `${JSON.stringify(pkg, null, 4)}\n`);
    return destination;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const { values } = parseArgs({
            options: {
                template: { type: 'string' },
                target: { type: 'string' },
                name: { type: 'string' },
                help: { type: 'boolean', short: 'h' },
            },
        });
        if (values.help) {
            console.log('node scripts/create-project.mjs --template <pc|screen> --target <目录> [--name <包名>]');
        } else {
            const destination = await createProject(values);
            console.log(`${values.template} 工程已生成：${destination}`);
        }
    } catch (error) {
        console.error(`创建失败，请检查参数和目标目录：${error.message}`);
        process.exitCode = 1;
    }
}
