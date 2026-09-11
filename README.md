# Vite 工程脚手架

基于公共基础生成 **PC** 或 **大屏** 工程。根目录维护生成器与模板，生成后的工程保持普通 Vue/Vite 项目结构。

| 类型 | UI 框架 | 布局与入口 | 规范 |
| --- | --- | --- | --- |
| pc | Ant Design Vue | 普通桌面布局，不包含 ScaleLayout | PC AGENTS 与浅色 UI 规范 |
| screen | Naive UI | App.vue 使用 ScaleLayout，默认 1920×1080、fill | 大屏 AGENTS 与独立 UI 规范 |

公共基础包含 Vue 3、Vite、TypeScript、Vue Router、Pinia、Axios、VueUse、UnoCSS、Less、EchartsCom、图标自动解析、ESLint、Stylelint、Prettier、Vitest 和 Playwright。

## 创建工程

使用 Node.js 20.19.0+、pnpm 9.15.9。从已有脚手架目录运行，无需先安装生成器依赖：

```shell
# PC
node scripts/create-project.mjs --template pc --target ../my-pc

# 大屏
node scripts/create-project.mjs --template screen --target ../my-screen
```

然后进入选中的生成目录：

```shell
cd ../my-pc
# 首次创建时初始化 Git
git init
pnpm install
pnpm dev
```

工程名默认由目标目录名转换为合法包名，可通过 `--name my-project` 指定。路径包含空格时用引号包裹。支持不存在的目录和已有空目录，拒绝覆盖非空目录、文件或符号链接。

从远程获取脚手架时，先下载到独立目录，再生成目标工程：

```shell
template_tmp=$(mktemp -d "${TMPDIR:-/tmp}/vite-tpl.XXXXXX")
npx degit CDTRSFE/vite-tpl "$template_tmp/source"
node "$template_tmp/source/scripts/create-project.mjs" --template pc --target "$PWD/my-project"
```

大屏将参数改为 `--template screen`。逐步执行并检查结果；若远程仓库尚未包含生成器，应先发布对应仓库更新。不要将整个脚手架仓库复制到目标目录当作业务工程。下载临时目录在生成后可清理。

`forge-starter` 沿用原来的类型、名称、路径输入和结果输出；其内部按上述方式选择模板，生成后继续初始化 Git、安装依赖。技能是本机独立文件，不会随仓库提交自动发布。

## 目录职责

```text
scripts/
  create-project.mjs        # 无第三方依赖的生成器
  create-project.test.mjs   # 真实文件生成与目录保护测试
  check-templates.mjs       # 分别生成、安装并检查两类工程
templates/
  base/                     # 公共源码、工具配置、package.json
  pc/                       # PC 入口、UI 配置、依赖差异、锁文件与规范
  screen/                   # 大屏入口、ScaleLayout、Naive UI、锁文件与规范
docs/
  requirements/             # 脚手架自身需求与生成机制
```

生成器先复制 base，再覆盖所选类型文件，合并 package.json 的 scripts、dependencies、devDependencies。只复制所选类型的锁文件，不复制另一类型、生成器、脚手架需求文档或 node_modules。

生成后的 `ui.config.ts` 由共享 `vite.config.ts` 引用，负责选择组件解析器；UI API 的全局类型位于 `src/types/ui.d.ts`。

## 维护模板

- 通用修改放在 `templates/base/`；类型差异放到对应模板的同名路径。
- 修改 UI 前阅读对应模板的 `AGENTS.md` 和 `docs/ui-design-guidelines.md`。
- `ScaleLayout` 及测试只维护在 screen。默认 `fill` 分别缩放宽高；`contain` 等比居中留边，只在应用根部使用一次。
- 新增依赖后，在独立生成工程内执行 `pnpm install` 更新锁文件，将该锁文件回写对应模板；公共依赖变化需同时更新两类锁文件。不要在模板片段目录直接安装依赖。
- `src/types/components.d.ts` 由插件生成，不手动维护或复制进模板。
- 完整实现规则见 `docs/requirements/project-templates.md`。

## 验证

```shell
# 仅运行生成器测试
pnpm test

# 测试生成器，并在临时目录生成两类工程，安装各自锁定依赖后执行检查
pnpm check
```

根 `pnpm check` 使用 `pnpm install --frozen-lockfile --ignore-scripts`，避免检查临时工程时初始化 Git hooks；随后执行生成工程的 lint、Vue 类型检查和单元/组件测试。检查结束清理本次临时目录。

PC 初始模板没有业务测试，允许零用例；大屏包含缩放生命周期和真实 Naive UI 消息、对话框接入测试。各工程保留 `pnpm dev`、`pnpm check`、`pnpm build`、`pnpm test:e2e` 等命令。

页面、浮层和缩放的浏览器运行时验证先询问用户；确认后检查 Console、Network、布局及交互。
