# AI 开发约定

## 项目类型

本项目仅保证宽度不低于 1440px 的桌面窗口。在受支持范围内调整窗口尺寸时，页面应合理占满可用区域，不出现无意义留白；主内容、表格、筛选区和弹窗不得被异常压缩、遮挡、溢出或发生布局错乱。低于 1440px 不做兼容要求。

## 前端编码约定

- 页面和组件的布局、间距、尺寸、颜色及简单排版优先使用 UnoCSS；伪元素、动画、复杂选择器、`:deep()` 和 UnoCSS 难以表达的样式使用 Less。主题色优先使用 UnoCSS 的 `primary` 或 Less 的 `@primary` 等项目变量。
- `src/components/` 根目录中的组件由 `unplugin-vue-components` 自动按需解析，在 Vue 模板中使用时无需手动 import；在 script 中直接引用组件对象时仍需显式 import。由于当前配置为 `deep: false`，`src/components/` 的子目录和 `src/views/**/components/` 中的组件必须显式 import。
- Ant Design Vue 组件在模板中使用 `<a-button>`、`<a-table>` 等标签时无需手动 import；`message`、`Modal` 等函数式 API 必须显式 import。
- `src/assets/icons/` 中的 SVG 由 `vite-plugin-import-icons` 注册为 `icons-` 前缀组件。例如 `src/assets/icons/search.svg` 在模板中使用 `<icons-search></icons-search>`，无需手动 import。
- Vue、Vue Router 和 VueUse 的 JavaScript API 必须显式 import；`defineProps`、`defineEmits`、`defineExpose`、`defineModel` 和 `withDefaults` 等 Vue 编译器宏无需 import。
- `src/types/components.d.ts` 由组件自动解析插件生成，不得手动修改。

## UI 设计规范

在本项目中进行任何 UI 相关开发前，必须先阅读：

```text
docs/ui-design-guidelines.md
```

后续页面和组件开发应遵守该文档中的设计规范与质量检查要求。

## 需求文档

本项目的需求细化和最终实现方案统一维护在：

```text
docs/requirements/*.md
```

详细维护规则见：

```text
docs/requirements/README.md
```

`docs/superpowers/` 不作为项目事实来源；如果工具临时生成该目录内容，必须把有效信息迁移或合并到 `docs/requirements/*.md`。

## 测试与验证规则

涉及功能、新页面、接口、表单、Store、组件重构、Bug 修复或其他代码行为变化时，必须先阅读并遵守：

```text
docs/testing-workflow.md
```

## 开发流程

- 新功能、新页面或业务行为变化：先读取相关需求文档和测试规范；只补齐会影响实现结果的必要上下文，并按任务复杂度决定是否需要设计和实施计划。
- 明确 Bug、报错或既有行为异常：先稳定复现并定位根因，再做最小修复；能自动化验证时补充防回归测试。
- 纯样式、文案、类型、配置、脚本、文档或机械重命名，且不改变业务行为：可以直接做最小修改。纯样式改动不新增测试文件。
- 实施过程中如果发现任务实际涉及新的业务规则、接口、权限、状态或验收边界，必须按新功能或业务行为变化重新处理。

## 完成与 Git 边界

- 完成修改后，必须根据改动内容和风险执行能够证明目标已达成的验证，并报告实际结果。lint、Vue 类型检查和全量测试均适用时，优先运行 `pnpm check`；选择其他目标命令或某类验证不适用时，应说明原因。
- 涉及页面、组件、样式、交互、接口联调或性能的修改，完成后先询问用户是否使用浏览器做运行时验证；用户确认后再执行，并说明页面、操作、Console、Network 和布局检查结果。
- 未经用户明确确认，不得执行 `git add`、`git commit`、`git push` 或创建 MR/PR；该限制同时适用于 Jira 和非 Jira 任务。
