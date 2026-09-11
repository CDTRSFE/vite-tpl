# 组件图谱索引

> 生成日期：2026-09-11
> 扫描范围：`src/components/**/*.vue`、`src/views/**/components/**/*.vue`。
> 本文件是项目正式组件索引；后续 UI / 组件开发前先扫描同步，开发后再次同步。

## 公共组件

| 组件 | 路径 | 用途 | Props | Emits | 引用文件数 | 模板使用次数 | 引用位置 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| InfoText | `src/components/InfoText.vue` | PC 模板技术栈介绍 | - | - | 1 | 1 | src/views/home/Home.vue |
| EchartsCom | `src/components/EchartsCom.vue` | 图表展示组件 | options | - | 0 | 0 | - |

## 页面局部组件

| 组件 | 路径 | 所属页面 | 用途 | Props | Emits | 引用文件数 | 模板使用次数 | 引用位置 | 是否建议公共化 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| VueLogo | `src/views/home/components/VueLogo.vue` | home | PC 首页 Vue 标识展示 | - | - | 1 | 1 | src/views/home/Home.vue | 否 |

## 设计稿拆组件记录

| 页面/需求 | 拆分结果 | 复用组件 | 新增组件 | 决策说明 |
| --- | --- | --- | --- | --- |
| PC 工程模板 | 保留现有首页和技术栈介绍 | EchartsCom、InfoText、VueLogo | 无 | 组件与入口沿用现有 PC 模板 |
