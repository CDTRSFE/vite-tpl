# 通用代码规则

## 代码生成要求
- 生成代码时必须严格遵循项目中已有的 stylelint、eslint 和 prettier 配置规则
- 在生成代码前，检查项目根目录下的配置文件

## 配置文件参考
在生成代码时，请参考并遵循以下配置文件：
- ./eslint.config.js
- ./.prettierrc.js
- ./stylelint.config.js

## 代码风格规则
- 使用TypeScript进行开发
- 遵循项目已有的命名约定
- 遵循项目已有的文件结构和模块组织方式

# Vue 项目规则

## 代码生成要求
- 所有Vue文件必须使用 PascalCase 风格命名
- script 部分使用 TypeScript 语法，style 部分使用 Less 语法
- 使用 composition API
- 使用 Vue 相关 API 无需引入
- 使用 VueUse 无需引入
- 使用 AntDesignVue 无需引入
- 使用 ElementPlus 无需引入
- /src/components 目录中的组件为公共组件，使用前无需引入
- 样式使用 unocss 编写（tailwindcss 风格）

# 测试文件

## 代码生成要求
- 生成代码前参考 ./src/test/setup.ts 和 ./vitest.config.ts 配置文件
- 测试文件名使用源文件名称 + .test.ts
- 测试文件必须与被测试的文件在同一目录下
- vitest 相关 API 无需引入
