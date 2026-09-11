# 脚手架测试工作流

根目录的 `pnpm test` 验证生成器的真实文件输出、模板隔离、参数与目录边界。`pnpm check` 在此基础上分别生成 PC 和大屏工程，安装匹配锁文件的依赖，并执行各工程的 lint、Vue 类型检查和单元/组件测试。

模板组件与功能开发规则见 `templates/base/docs/testing-workflow.md`；类型约束见各模板的 AGENTS.md。生成器测试放在 scripts/，组件测试放在模板对应源文件附近。纯样式和文档不单独新增测试。

完成涉及 UI 的修改后，先询问用户是否进行浏览器运行时验证；确认后检查页面、操作、Console、Network 和布局。未经明确授权不提交、推送或创建 MR/PR。
