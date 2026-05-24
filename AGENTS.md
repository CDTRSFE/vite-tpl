# AI 开发约定

## 项目类型

本项目是 PC 端后台管理项目，不需要为小于 1440px 的屏幕做布局兼容。

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
