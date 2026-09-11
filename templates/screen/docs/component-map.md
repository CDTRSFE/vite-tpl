# 组件图谱索引

> 生成日期：2026-09-11
> 扫描范围：`src/components/**/*.vue`、`src/views/**/components/**/*.vue`。
> 本文件是项目正式组件索引；后续 UI / 组件开发前先扫描同步，开发后再次同步。

## 公共组件

| 组件 | 路径 | 用途 | Props | Emits | 引用文件数 | 模板使用次数 | 引用位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ScaleLayout | `src/components/ScaleLayout.vue` | 大屏 body 画布缩放与生命周期清理 | w, h, fit | - | 2 | 1 | src/App.vue<br>src/components/ScaleLayout.test.ts |
| UiContext | `src/components/UiContext.vue` | Naive UI 全局消息与对话框 API 初始化 | - | - | 1 | 1 | src/App.vue |
| EchartsCom | `src/components/EchartsCom.vue` | 图表展示组件 | options | - | 0 | 0 | - |

## 页面局部组件

| 组件 | 路径 | 所属页面 | 用途 | Props | Emits | 引用文件数 | 模板使用次数 | 引用位置 | 是否建议公共化 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## 设计稿拆组件记录

| 页面/需求 | 拆分结果 | 复用组件 | 新增组件 | 决策说明 |
| --- | --- | --- | --- | --- |
| 大屏工程模板 | 入口接入画布缩放与 Naive UI Provider | EchartsCom、ScaleLayout | UiContext | 复用已有缩放能力，单独初始化全局 UI API |
