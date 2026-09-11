# 大屏工程模板

Vue 3、Vite、TypeScript、Naive UI、Vue Router、Pinia、Axios、UnoCSS、Less、VueUse 和 ECharts。

## 开始开发

使用 Node.js 20.19.0+、pnpm 9.15.9。创建技能默认已安装依赖。

```shell
pnpm install
pnpm dev
```

## 入口与组件

- src/App.vue：在根部使用 ScaleLayout，默认 1920×1080、fit="fill"，并接入 Naive UI 深色主题、中文、消息和对话框 Provider。
- src/components/ScaleLayout.vue：缩放整个 body，fill 分别缩放宽高，contain 等比缩放居中；仅在根部挂载一次。卸载时恢复全局样式和监听。
- src/components/UiContext.vue：在 Provider 后代初始化 window.$message、window.$dialog；组件内优先显式导入 useMessage、useDialog。
- src/components/EchartsCom.vue：图表公共组件，通过 options 传入配置，外部容器需有确定宽高。
- src/views/home/Home.vue：消息与对话框示例，不含业务数据。
- ui.config.ts：Naive UI 自动组件解析器；基础组件使用 n- 前缀。src/components 根目录组件可在模板中自动解析；子目录组件需显式引入。
- src/assets/icons/：SVG 自动注册为 icons- 前缀组件。
- src/plugins/axios.ts、src/plugins/loading.ts：请求与 loading 扩展点。
- src/assets/styles/main.less：大屏背景与文本变量；UnoCSS primary 和 Less @primary 为主色变量。

消息和对话框挂载到 #app，与画布共享坐标系。新增下拉菜单、选择器、抽屉等浮层时明确挂载点并检查缩放后位置，不重复缩放浮层。

## 文档

- AGENTS.md：大屏开发约定。
- docs/ui-design-guidelines.md：大屏视觉和布局规范。
- docs/testing-workflow.md：测试与运行时验证流程。
- docs/requirements/README.md：需求知识库维护规则。

## 检查与构建

```shell
pnpm check
pnpm test:run
pnpm test:e2e
pnpm build
```

默认 Playwright 视口为 1920×1080。浏览器运行时验证先征得用户确认，再检查页面、操作、Console、Network、布局及浮层。
