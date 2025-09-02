# Vite 项目模版

## 特性

+   Vue3, Vite, TS
+   [ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn) - 基于 Vue3 的组件库
+   [axios](https://axios-http.com/) - 基于 promise 的 HTTP 库
+   [PNPM](https://pnpm.io/zh/) - 快速的，节省磁盘空间的包管理工具
+   [UnoCSS](https://github.com/unocss/unocss) - 原子化 CSS 引擎
+   [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
+   [VueUse](https://github.com/vueuse/vueuse) - 基于 Composition API 的工具函数集
+   [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 组件自动化加载
+   [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - API 自动按需引入
+   [vite-plugin-import-icons](https://github.com/CDTRSFE/vite-plugin-import-icons) - 以组件的方式按需引入图标
+   ESLint, Stylelint, Prettier
+   [vitest](https://vitest.dev/) - 基于 Vite 的测试框架
+   [@vue/test-utils](https://test-utils.vuejs.org/) - Vue 测试工具库

## 使用

```shell
npx degit CDTRSFE/vite-tpl my-project
cd my-project
git init
pnpm i
pnpm dev
```

## 目录

```
.
├── .cursor/                         # Cursor IDE 配置
│   └── rules/                       # 代码规则配置
├── .editorconfig                    # 编辑器配置
├── .gitignore
├── .husky/                          # Git hooks
│   ├── _/
│   ├── commit-msg                   # commit message 格式检测
│   └── pre-commit                   # git 钩子，commit 之前执行 pnpm lint, pnpm stylelint
├── .prettierignore                  # prettier 忽略文件配置
├── .prettierrc.js                   # prettier 配置
├── .trae/                           # Trae AI 配置
│   └── rules/
├── .vscode/                         # VSCode 配置
│   └── extensions.json
├── public/                          # 静态资源文件夹
│   └── favicon.ico
├── src/
│   ├── App.vue                      # 根组件
│   ├── assets/
│   │   ├── fonts/                   # 字体文件夹
│   │   ├── icons/                   # 图标文件夹
│   │   ├── images/                  # 图片文件夹
│   │   └── styles/                  # 样式文件夹
│   │       ├── main.less            # 全局样式
│   │       └── mixin.less           # 样式混入
│   ├── components/                  # 全局组件文件夹
│   │   ├── ScaleLayout.vue          # 大屏缩放组件
│   ├── directives/                  # 全局指令文件夹
│   │   └── index.ts                 # 注册指令
│   ├── main.ts                      # 入口文件
│   ├── plugins/
│   │   ├── axios.ts                 # axios 配置
│   ├── router/                      # 路由配置
│   ├── store/                       # 状态管理
│   ├── types/
│   │   ├── global.d.ts              # 全局类型声明
│   │   └── shims.d.ts               # 模块类型声明
│   └── views/
├── test/                            # 测试配置
│   └── setup.ts                     # 测试环境设置
├── README.md
├── commitlint.config.js             # commitlint 配置
├── eslint.config.js                 # eslint 配置
├── index.html
├── package.json
├── pnpm-lock.yaml
├── stylelint.config.js              # stylelint 配置
├── tsconfig.json                    # TypeScript 配置
├── uno.config.ts                    # UnoCSS 配置
├── vite.config.ts                   # Vite 配置
└── vitest.config.ts                 # Vitest 测试配置
```

## node 版本

推荐使用 Node.js v20.9.0 及以上版本。

## 🚀 axios

项目中引入了 axios，拦截器等相关配置在 `src/plugins/axios.ts` 中，axios 实例可作为全局变量直接访问，也可通过 Vue 组件的全局属性访问。

```vue
<script lang="ts">
export default defineComponent({
    created() {
        this.$axios('/xxx');
    },
});
</script>
```

```vue
<script lang="ts" setup>
window.axios.get('/xxx');
axios.get('/xxx');
</script>
```

通常情况下，发请求需要显示 loading 动画，所有请求都响应后关闭动画，可在 `src/plugins/loading.ts` 中修改具体的 loading 逻辑。对于不需要 loading 动画的请求可以在配置中添加 `loading` 属性：

```javascript
axios.get('/xxx', { loading: false });
```

## 🚀 组件自动化加载

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 自动按需引入组件，也无需注册，使用全局组件和 UI 组件库时更加方便。配置后，项目中放在 `'src/components'` 目录下的组件可在全局直接使用。

### ⚙️ 配置

```jsx
// vite.config.ts

import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        Components({
            dirs: ['src/components'],
            extensions: ['vue', 'js', 'ts'],
            include: [/\.vue$/, /\.vue\?vue/],
            dts: 'src/types/components.d.ts',
            resolvers: [
                AntDesignVueResolver(),
            ]
        }),
    ],
})
```

+ `dirs` 指定查找组件的相对路径，此目录下的组件并非全局注册。
+ `dts: 'src/types/components.d.ts'` 表示生成全局类型声明文件，用于 volar 类型提示。
+ `AntDesignVueResolver` 用于解析 ant-design-vue 组件引入。

### 🧐 使用

```
./src
├── components
│   ├── FullLoading.vue
│   └── TabSelect.vue
```

```html
<template>
    <full-loading></full-loading>
    <a-button type="primary">btn<a/-button>
</template>
```

通过插件处理后，相当于：

```html
<template>
    <full-loading></full-loading>
    <a-button type="primary">btn</a-button>
</template>

<script setup lang="ts">
import FullLoading from '@/components/FullLoading.vue';
import ElButton from 'ant-design-vue/es/button';
import 'ant-design-vue/es/button/style/css';
</script>
```

## 🚀 **API 自动引入**

通过 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 插件自动按需引入所需 API，`ref`, `watch`, `useRouter` 等 API 无需引入可直接使用。

```html
<template>
    <div>{{ name }}</div>
</template>

<script setup lang="ts">
const name = ref('name');
</script>
```

### ⚙️ 配置

```jsx
// vite.config.ts

import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
    plugins: [
        AutoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: [
                'vue',
                'vue-router',
                '@vueuse/core',
            ],
            dts: 'src/types/auto-imports.d.ts',
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
        }),
    ],
});
```

+ `include` 指定需要转换的目标文件，自动引入 API 可以在 js, ts, jsx, tsx, vue 文件中使用。
+ `imports` 添加了 vue, vue-router, @vueuse/core 三个包，使用时无需导入。
+ `dts: 'src/types/auto-imports.d.ts'` 用于生成类型声明文件。
+ `eslintrc` 启用此项配置为了解决 [ESLint 提示 eslint(no-undef) 的问题](https://github.com/antfu/unplugin-auto-import#eslint---eslintno-undef)，会生成一个 ./.eslintrc-auto-import.json 文件，将自动引入的 API 作为全局变量处理，需要在 ESLint 配置文件中作为扩展添加：

```jsx
// eslint.config.js
const autoImport = JSON.parse(readFileSync('./.eslintrc-auto-import.json', 'utf8'));

module.exports = [
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
]
```

## 🚀 Pinia

[Pinia](https://pinia.vuejs.org/) 是 Vue 的一个状态管理库，由 Vue 团队成员创建，会成为 Vuex 的继承者，Vue 文档中也[推荐使用 Pinia](https://vuejs.org/guide/scaling-up/state-management.html#pinia)。与 Vuex 相比，Pinia 提供了一个更简单的 API，可以使用 composition-API 风格，在与 Typescript 一起使用时具有可靠的类型推断支持。

和 Vuex ≤ 4 相比，有许多不同：

- 不再有 mutations，不需要再区分同步异步去使用不同的方法；
- 不再需要通过复杂的包装器来支持 Typscript；
- 不再有模块的概念，但同时支持在 store 中使用其他 store；

### 定义 store

`store` 使用 [`defineStore()`](https://pinia.vuejs.org/api/modules/pinia.html#definestore)  定义，有三种传参格式：

```jsx
defineStore(id, options);
defineStore(options);
defineStore(id, storeSetup, options?);
```

其中 `id` 可以通过第一个参数传递，如果不存在，则通过 `options.id` 获取，作为唯一的名称。传参最主要的区别是 `options` 和 `storeSetup`。`options` 是一个对象，包含 `state`, `getters`, `actions`，和 Vuex 类似：

```jsx
import { defineStore } from 'pinia';

export const useCountStore = defineStore('counter', {
    state: () => ({
        counter: 0,
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
    },
    actions: {
        increment() {
            this.counter++;
        },
    },
})
```

第三种传参方式，`storeSetup` 参数是一个函数，和 Vue setup 方法类似，这也是更推荐的写法：

```jsx
import { defineStore } from 'pinia';

export const useCountStore = defineStore('counter', () => {
    const counter = ref(0);
    const doubleCount = computed(() => counter.value * 2);
    const increment = () => counter.value++;

    return { counter, doubleCount, increment };
})
```

可以根据需要定义任意多个 store，并且应该放在不同的文件中，如：

```
src
└── store
    ├── user.ts
    ├── counter.ts
    └── base.ts
```

### 使用 store

```jsx
<template>
    <div>counter: {{ count.counter }}</div>
    <div>double count: {{ count.doubleCount }}</div>
    <button @click="count.increment">increment</button>
</template>

<script lang="ts" setup>
import { useCountStore } from '@/store/counter';

const count = useCountStore();
watchEffect(() => {
    console.log(count.counter);
});
</script>
```

store 是一个用 reactive 包装的对象，可以使用 [storeToRefs](https://pinia.vuejs.org/api/modules/pinia.html#skiphydrate) 实现不丢失响应性的情况下对返回的对象进行解构/展开：

```jsx
import { useCountStore } from '@/store/counter';
import { storeToRefs } from 'pinia';

const store = useCountStore();
const { counter } = storeToRefs(store); // store.counter
```

## 🚀 图标

通过 [vite-plugin-import-icons](https://github.com/CDTRSFE/vite-plugin-import-icons) vite 插件实现**图标组件化**，可以将本地图标包装成组件，还有**自动引入**、**按需加载**的功能。

### ⚙️ 配置

```jsx
// vite.config.ts
import path from 'path';
import ImportIcons, { ImportIconsResolver } from 'vite-plugin-import-icons';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                ImportIconsResolver(),
            ],
        }),
        ImportIcons({
            collections: {
              	icons: path.resolve(__dirname, './src/assets/icons'),
            },
        }),
    ],
});
```

配置说明：

- `ImportIconsResolver` 用于将组件化后的图标组件自动引入，可以直接在 template 中使用。
- `collections` 用于加载图标，将 './src/assets/icons' 目录下所有 svg 作为一个图标集。

项目中使用了 Typescript，还需要添加类型声明文件 tsconfig.json：

```json
{
    "compilerOptions": {
        "types": [
            "vite-plugin-import-icons/types",
        ]
    }
}
```

### 🧐 使用

只需要把 svg 文件放到 ‘./src/assets/icons’ 目录即可，图标集为 ‘icons’，图标名为文件名，推荐使用小写字母，多个单词用短横线链接(kebab-case)：

```
src
└─ asstes
    └─ icons
        └─ about.svg
```

```html
<template>
    <icons-about></icons-about>
</template>
```

图标自动加载和组件自动加载一样，会生成对应的模块声明：

```jsx
// src/types/components.d.ts

declare module 'vue' {
    export interface GlobalComponents {
        IconsHome: typeof import('~icons/icons/home')['default']
    }
}
```

如果不使用组件自动加载功能，则需要先 import :

```html
<template>
    <icons-about></icons-about>
</template>
<script setup lang="ts">
import IconsAbout from '~icons/icons/about’;
</script>
```

引入图标的路径 `~icons/*` 是一个虚拟路径，由插件处理后，找到真实的 svg 文件，然后包装成 vue 组件返回。

### 批量引入

vite-plugin-import-icons 插件提供了一个 [`import.meta.icons`](https://github.com/CDTRSFE/vite-plugin-import-icons#%E6%89%B9%E9%87%8F%E5%BC%95%E5%85%A5) 函数，用于一次性引入多个图标。

```vue
<template>
    <component v-for="(icon, name) in icons" :is="icon" :key="name"></component>
</template>
<script>
const icons = import.meta.icons('icons', 'menu-*')
</script>
```

### 和 iconfont 字体图标比较

在 iconfont 上把所有需要的图标加入项目，再以 font-class 的方式使用是一个比较常见的做法，不过有以下问题：

- 首先需要先在平台上添加图标到项目，然后下载图标，最后再替换本地的文件，过程更繁琐；
- 文件包含所有图标，无法按需加载；
- 平台账号丢失，只能新建一个图标项目；
- 多色图标需要换用 svg 或者图片，造成项目中图标使用风格不统一；

## 🚀 UnoCSS

[UnoCSS](https://github.com/unocss/unocss) 是高性能且极具灵活性的即时原子化 CSS 引擎。

### ⚙️ 配置

UnoCSS 的配置文件是 uno.config.ts，需要在项目入口文件中引入相关 CSS：

```tsx
// main.ts

// 'uno:[layer-name].css'
import 'uno:components.css';
// layers that are not 'components' and 'utilities' will fallback to here
import 'uno.css';
// your own CSS
import './assets/styles/main.less';
// "utilities" layer will have the highest priority
import 'uno:utilities.css';
```

### 工具类

工具类的详细介绍可查看文档 [https://windicss.org/utilities/](https://windicss.org/utilities/)，也可以通过搜索快速找到需要的类。

### VS Code 插件

[UnoCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) 通过提供给 Visual Studio Code 用户一些特性的方式来提高 UnoCSS 的开发体验，例如：自动补全、语法高亮。

## 🚀 样式

项目中依然采用 Less 作为 CSS 预处理器。

`./src/assets/styles/main.less` 可用于存放公共样式。

## 🚀 Stylelint

建议安装编辑器 [stylelint 插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，并开启保存时自动修复。

vscode settings.json：

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.stylelint": true
    }
}
```

## 🚀 ESLint

`.eslintrc-auto-import.json` 引入的是一些全局变量的配置，为了解决 [unplugin-auto-import ESLint 报错的问题](https://github.com/antfu/unplugin-auto-import#eslint---eslintno-undef) 。

项目中使用了 prettier，但无需安装 prettier 插件， 因为 eslint-plugin-prettier 插件可以通过 eslint 提示错误以及自动修复。

## 🚀 版本控制

- 使用 [lint-staged](https://github.com/okonet/lint-staged) 在提交代码前执行 `pnpm lint` 和 `pnpm stylelint`，防止不规范的代码推送到远程仓库。
- 使用 [Commitizen](https://github.com/commitizen/cz-cli) + [Commitlint](https://github.com/conventional-changelog/commitlint) 对 commit message 做格式校验，可以使用 `git cz`
 代替 `git commit` 生成[符合规范](https://www.conventionalcommits.org/)的 message ，如 `feat(api): xxx`。

> 需要先全局安装 commitizen：`pnpm add -g commitizen` 。

## 🚀 测试

项目使用 [Vitest](https://cn.vitest.dev/) 作为测试框架，配合 [@vue/test-utils](https://test-utils.vuejs.org/) 进行 Vue 组件测试。

### 测试命令

```bash
# 运行测试（监听模式）
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行测试 UI 界面
pnpm test:ui
```

### 测试配置

- **测试配置文件**: `vitest.config.ts`
- **测试环境设置**: `test/setup.ts`
- **测试文件匹配**: `**/*.{test,spec}.{js,ts,jsx,tsx}`

### 测试文件规范

- 测试文件命名：`[源文件名].test.ts`
- 测试文件位置：推荐单元测试与被测试文件在同一目录下，集成测试（integration test）、端到端测试（e2e test）放在 tests/ 目录下

### VS Code 插件推荐

- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer) - Vitest 测试资源管理器
