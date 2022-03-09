# Vite 项目模版

## 特性

+   Vue3, Vite, TS

+   [element-plus](https://element-plus.gitee.io/zh-CN/) - 基于 Vue3 的组件库
+   [axios](https://axios-http.com/) - 基于 promise 的 HTTP 库
+   [PNPM](https://pnpm.io/zh/) - 快速的，节省磁盘空间的包管理工具
+   [Windi CSS](https://windicss.org/) - 工具优先的 CSS 框架
+   [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
+   [VueUse](https://github.com/vueuse/vueuse) - 基于 Composition API 的工具函数集
+   [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 组件自动化加载
+   [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - API 自动按需引入
+   [unplugin-icons](https://github.com/antfu/unplugin-icons) - 以组件的方式按需引入图标
+   ESLint, Stylelint

## 使用

```shell
npx degit CDTRSFE/vite-tpl my-project
cd my-project
pnpm i
pnpm dev
```

## 目录

```
.
├── .husky
│   ├── commit-msg                   # commit message 格式检测
│   └── pre-commit                   # git 钩子，commit 之前执行 pnpm lint, pnpm styelint
├── .vscode
├── public                           # 静态资源文件夹
│   └── favicon.ico
├── src
│   ├── App.vue                      # 根组件
│   ├── assets
│   │   ├── fonts                    # 字体文件夹
│   │   ├── icons                    # 图标文件夹
│   │   ├── images                   # 图片文件夹
│   │   └── styles                   # 样式文件夹
│   │       └── main.less            # 全局样式
│   ├── components                   # 全局组件文件夹
│   ├── directives                   # 全局指令文件夹
│   │   └── focus.js
│   ├── main.ts                      # 入口文件
│   ├── plugins
│   │   ├── axios.ts                 # axios
│   │   └── loading.ts
│   ├── router
│   │   └── index.ts                 # 路由
│   ├── store                        # 状态管理
│   ├── types
│   │   ├── auto-imports.d.ts        # 自动引入 API 的类型声明
│   │   ├── components.d.ts          # 自动注册组件的类型声明
│   │   ├── global.d.ts              # 全局类型声明
│   │   └── shims.d.ts               # 模块类型声明
│   └── views
│       └── Index.vue
├── .eslintignore
├── .eslintrc.js                     # eslint 配置
├── .eslintrc-auto-import.json       # 自动引入的 API 全局变量配置
├── .gitignore
├── index.html
├── README.md
├── commitlint.config.js             # commitlint 配置
├── stylelint.config.js              # stylelint 配置
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json                    # ts 配置
├── vite.config.ts                   # vite 配置
└── windi.config.ts                  # Windi CSS 配置
```

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

通常情况下，发请求需要显示 loading 动画，所有请求都响应后关闭动画，可在 `src/plugins/loading.ts` 中修改具体的 loading 逻辑。对于不需要 loading 动画的请求需要在配置中添加 `loading` 属性：

```javascript
axios.get('/xxx', { loading: false });
```

## 🚀 PNPM

[PNPM](https://pnpm.io/zh/) 是一个快速的，节省磁盘空间的包管理工具。比 npm 安装速度更快，空间占用更少。

1⃣️  **减少磁盘空间占用**

所有安装的包都会存储在磁盘上的某一位置，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间，允许跨项目共享同一版本的依赖。这也提高了安装速度；

如果用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。 `pnpm update` 时只会向存储中心额外添加新文件，而不会复制整新版本包的内容。

2⃣️  **创建非扁平化的 node_modules 文件夹**

第二个特点是，使用 pnpm 项目中 [node_modules 目录结构不再是扁平化](https://pnpm.io/zh/symlinked-node-modules-structure)，这种布局的一大好处是只有真正在依赖项中的包才能访问。

### 💻 CLI 命令

与 npm 命令等效列表：

| npm 命令 | pnpm 等效 |
| --- | --- |
| npm install | pnpm install |
| npm i <pkg> | [pnpm add <pkg>] |
| npm run <cmd> | [pnpm <cmd>] |
| npm uninstall <pkg> | pnpm remove <pkg>  别名：rm / uninstall / un |

当使用一个未知命令时，pnpm 会查找一个具有指定名称的脚本，所以 `pnpm run lint` 和 `pnpm lint`相同。

如果没有指定名称的脚本，那么 pnpm 将以 shell 脚本的形式执行该命令，所以可以做类似 `pnpm eslint` 的事情(查阅 [pnpm exec](https://pnpm.io/zh/cli/exec))。在 npm 中需要使用 npx 实现 , `npx eslint` →  `pnpm eslint` 。

pnpm 默认使用 npm - [https://registry.npmjs.org/](https://registry.npmjs.org/) 的源，可以设置其他源：

```bash
$ nrm use taobao
```

避免安装时用错包管理器，在 package.json 中添加了 preinstall 脚本，限制[只允许使用 pnpm](https://pnpm.io/zh/only-allow-pnpm)：

```json
{
    "scripts": {
        "preinstall": "npx only-allow pnpm"
    }
}
```

## 🚀 VueUse

[VueUse](https://github.com/vueuse/vueuse) 是一个基于 Composition API 的工具函数集，同时支持 Vue2 / Vue 3。

> VueUse 使用 vue-demi 实现对 Vue2 的支持，vue-demi 内部会对 Vue 版本做判断，如果是 Vue2 则使用 `@vue/composition-api` ，判断的过程在安装 vue-demi 之前，可以在 [package.json](https://github.com/vueuse/vue-demi/blob/master/package.json#L34) 中找到 `scripts.postinstall: ‘node ./scripts/postinstall.js’` ，虽然包的入口文件都是 `lib/index.cjs`, 它会根据项目中安装的 Vue 版本来修改入口文件的内容。

### 🧐 使用

工具库划分了几个大类：broswer(浏览器相关)，Sensors(传感器相关)，Animation(动画相关)，部分工具可以按 Component 使用，常用的有：

1️⃣  **浏览器分类(Browser)**：

⭐  **useClipboard** [https://vueuse.org/core/useClipboard/](https://vueuse.org/core/useClipboard/)

使用 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)，提供响应剪切板命令（剪切/复制/粘贴）的功能，可以异步地读写系统剪切板。

<details>
<summary>demo</summary><br>

```vue
<template>
    <div class="app">
        <input v-model="val" type="text">
        <button @click="copy(val)">copy</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';

const val = ref('');
const { copy } = useClipboard({ source: val })
</script>
```
<br></details>


⭐  **useEventListener** [https://vueuse.org/core/useEventListener/](https://vueuse.org/core/useEventListener/)

更容易地使用事件监听器，自动地在 mounted 时注册事件，在 unmounted 时移除事件监听。

<details>
<summary>demo</summary><br>
  
```js
import { useEventListener } from '@vueuse/core'

const element = ref<HTMLDivElement>()
useEventListener(element, 'keydown', (e) => { console.log(e.key) })
```
<br></details>


⭐  **useMediaControls** [https://vueuse.org/core/useMediaControls/](https://vueuse.org/core/useMediaControls/#demo)

用于 audio 和 video 标签的响应式媒体控制。

<details>
<summary>demo</summary><br>
  
```js
import { useMediaControls } from '@vueuse/core'

const video = ref()
const { playing, currentTime, duration, volume } = useMediaControls(video, { 
    src: 'video.mp4',
})

// playing, currentTime, duration, volume 的值都是响应式的
// 改变媒体属性
onMounted(() => {
    volume.value = 0.5
    currentTime.value = 60
    playing.value = true
})
```
<br></details>


⭐  **useScriptTag** [https://vueuse.org/core/useScriptTag/](https://vueuse.org/core/useScriptTag/)

script 标签注入。当组件 mounted 时自动加载 script，组件卸载时自动移除。也可通过配置手动控制 script 加载时机。

<details>
<summary>demo</summary><br>
  
```jsx
import { useScriptTag } from '@vueuse/core'

useScriptTag(
    'https://player.twitch.tv/js/embed/v1.js',
    // on script tag loaded.
    (el: HTMLScriptElement) => {
      // do something
    },
)
```

```jsx
import { useScriptTag } from '@vueuse/core'

const { scriptTag, load, unload } = useScriptTag(
    'https://player.twitch.tv/js/embed/v1.js',
    () => {
      // do something
    },
    { manual: true },
)

// manual controls
await load()
await unload()
```
<br></details>

⭐  **useUrlSearchParams** [https://vueuse.org/core/useurlsearchparams](https://vueuse.org/core/useurlsearchparams/?foo=bar&vueuse=awesome#useurlsearchparams)

响应式的 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)，可以读取或修改 url 参数，直接 history，hash 模式。

<details>
<summary>demo</summary><br>
  
```jsx
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('history')
// 获取
console.log(params.foo) // 'bar'
// 设置
params.foo = 'bar'
params.vueuse = 'awesome'
// url updated to `?foo=bar&vueuse=awesome`
```
<br></details>
    

2️⃣  **传感器分类(Sesors)**：

⭐  **onClickOutside** [https://vueuse.org/core/onClickOutside/](https://vueuse.org/core/onClickOutside/)

监听元素外部的点击事件，对弹框和下拉框很有用。

<details>
<summary>demo</summary><br>
  
```jsx
<template>
    <div ref="target">Hello world</div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
    
const target = ref(null)
onClickOutside(target, (event) => console.log(event))
</script>
```

或者使用无无渲染组件 *`OnClickOutside`* :

```jsx
<OnClickOutside @trigger="fn">
    <div>
      Click Outside of Me
    </div>
</OnClickOutside>
```
<br></details>  

⭐  **useMouse** [https://vueuse.org/core/useMouse/](https://vueuse.org/core/useMouse/)

响应式鼠标位置。

<details>
<summary>demo</summary><br>
  
```jsx
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()
// sourceType: "mouse" | "touch" | null
```
<br></details>

⭐  **useScroll** [https://vueuse.org/core/useScroll/](https://vueuse.org/core/useScroll/)

响应式的滚动位置和状态，返回滚动距离、到达状态、滚动方向、是否在滚动中，可以配置偏移量、截流、滚动回调函数等。

<details>
<summary>demo</summary><br>
  
```jsx
<script setup>
import { useScroll } from '@vueuse/core'

const el = ref(null)
const offset = { top: 30, bottom: 30, right: 30, left: 30 };
const onScroll = e => console.log(e)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, { offset, onScroll })
</script>

<template>
  <div ref="el"></div>
</template>
```
<br></details>

3️⃣  **动画分类(Animation)**：

⭐  **useIntervalFn** [https://vueuse.org/shared/useIntervalFn/](https://vueuse.org/shared/useIntervalFn/)

带控制器的 setInterval 包装器，可以调用暂停、继续方法。

<details>
<summary>demo</summary><br>
  
```jsx
import { useIntervalFn } from '@vueuse/core'

const { pause, resume, isActive } = useIntervalFn(() => {
    /* your function */
}, 1000)
```
<br></details>

⭐  **useRafFn** [https://vueuse.org/core/useRafFn/](https://vueuse.org/core/useRafFn/)

带有暂停/继续控制器的 requestAnimationFrame。

<details>
<summary>demo</summary><br>

```jsx
import { ref } from 'vue'
import { useRafFn } from '@vueuse/core'

const count = ref(0)

const { pause, resume } = useRafFn(() => {
    count.value++
    console.log(count.value)
})
```
<br></details>

⭐  **useTimeoutFn** [https://vueuse.org/shared/useTimeoutFn/](https://vueuse.org/shared/useTimeoutFn/)

带控制器的 setTimeout 包装器，可以调用 stop 手动停止、调用 start 重新开始。

<details>
<summary>demo</summary><br>
  
```jsx
import { useTimeoutFn } from '@vueuse/core'

const { isPending, start, stop } = useTimeoutFn(() => {
    /* ... */
}, 3000)
```
<br></details>

⭐  **useTransition** [https://vueuse.org/core/useTransition/](https://vueuse.org/core/useTransition/)

值之间的过渡。返回一个被监听的数值，当源数值改变，输出会过度到新值。如果源值在过渡的过程中被改变，一个新的过渡会从中断的地方开始。

<details>
<summary>demo</summary><br>

```jsx
import { ref } from 'vue';
import { useTransition, TransitionPresets } from '@vueuse/core'

const source = ref(0)
const output = useTransition(source, {
    duration: 500, // 默认 1000
    transition: TransitionPresets.easeInOutCubic // 默认 linear 线性过渡
})
```
<br></details>

4️⃣  **状态分类(State)**：

⭐  **useStorage** [https://vueuse.org/core/useStorage/](https://vueuse.org/core/useStorage/)

响应式的 **[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**/**[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)。**

<details>
<summary>demo</summary><br>

```jsx
import { useStorage } from '@vueuse/core'

// bind object
const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })
// bind boolean
const flag = useStorage('my-flag', true) // returns Ref<boolean>
// bind string with SessionStorage
const id = useStorage('my-id', 'some-string-id', sessionStorage) // returns Ref<string>
// delete data from storage
state.value = null
```
<br></details>

⭐  **createGlobalState** [https://vueuse.org/shared/createGlobalState/](https://vueuse.org/shared/createGlobalState/)

将状态保留在全局范围内，以便在 Vue 实例之间可重用。相当于响应式的全局变量。

<details>
<summary>demo</summary><br>

```jsx
// store.js
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
    () => useStorage('vueuse-local-storage', 'initialValue'),
)
```

```jsx
// component.js
import { useGlobalState } from './store'

// 每次调用 useGlobalState 都将返回同一个 state
const state = useGlobalState()
```
<br></details>

5️⃣  **元素分类(Elements)**：

⭐  **useElementBounding** [https://vueuse.org/core/useElementBounding/](https://vueuse.org/core/useElementBounding/)

使用了 [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) API 获取一个元素的大小及其相对于视口的位置，页面滚动或者元素改变时会更新返回值。

<details>
<summary>demo</summary><br>

```jsx
import { useElementBounding } from '@vueuse/core'

const { x, y, top, right, bottom, left, width, height } = useElementBounding(el)
```
<br></details>

⭐  **useMouseInElement** [https://vueuse.org/core/useMouseInElement/](https://vueuse.org/core/useMouseInElement/)

鼠标相对于一个元素的位置。

<details>
<summary>demo</summary><br>
  
```jsx
import { useMouseInElement } from '@vueuse/core'

// 鼠标相对于 target 左上角的坐标、鼠标是否在 target 外
const { x, y, isOutside, stop } = useMouseInElement(target)
// 停止监听 target 和鼠标的位置
stop()
```
<br></details>

⭐  **useMutationObserver** [https://vueuse.org/core/useMutationObserver/](https://vueuse.org/core/useMutationObserver/)

监听 DOM 树的改变。**[MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)**

<details>
<summary>demo</summary><br>

```jsx
import { useMutationObserver } from '@vueuse/core'

const el = ref(null)
const messages = ref([])

const cb = mutations => {
    if (!mutations[0]) messages.value.push(mutations[0].attributeName)
}
const { stop } = useMutationObserver(el, cb, { attributes: true })
// 停止监听
stop()
```
<br></details>

⭐  **useWindowScroll** [https://vueuse.org/core/useWindowScroll/](https://vueuse.org/core/useWindowScroll/)

响应式窗口滚动。

<details>
<summary>demo</summary><br>

```jsx
import { useWindowScroll } from '@vueuse/core'

const { x, y } = useWindowScroll()
```
<br></details>

⭐  **useWindowSize** [https://vueuse.org/core/useWindowSize/](https://vueuse.org/core/useWindowSize/)

响应式窗口大小。

<details>
<summary>demo</summary><br>

```jsx
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowScroll()
```
<br></details>

6️⃣  **组件分类(Componet)**：

⭐  **useTemplateRefsList** [https://vueuse.org/core/useTemplateRefsList/](https://vueuse.org/core/useTemplateRefsList/)

在 v-for 中绑定 refs 到模版和组件的一个快捷方式，比原本的写法 [v-for 中的 Ref 数组](https://v3.cn.vuejs.org/guide/migration/array-refs.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5) 更简洁。

<details>
<summary>demo</summary><br>

```jsx
<template>
    <div v-for="i of 5" :key="i" :ref="refs.set"></div>
</template>

<script setup lang="ts">
import { onUpdated } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'

const refs = useTemplateRefsList<HTMLDivElement>()

onUpdated(() => console.log(refs))
</script>
```
<br></details>

⭐  **useVirtualList** [https://vueuse.org/core/useVirtualList/](https://vueuse.org/core/useVirtualList/)

轻松创建虚拟列表。虚拟列表可以高效地渲染大量项目。

<details>
<summary>demo</summary><br>

```jsx
<template>
    <div v-bind="containerProps" style="height: 300px">
        <div v-bind="wrapperProps">
            <div v-for="item in list" :key="item.index" style="height: 22px">
                Row: {{ item.data }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVirtualList } from '@vueuse/core';

const allItems = ref(Array.from(Array(1000).keys()));
const { list, containerProps, wrapperProps } = useVirtualList(allItems, {
    itemHeight: 22,
});
</script>
```
<br></details>

⭐  **useVModel** [https://vueuse.org/core/useVModel/](https://vueuse.org/core/useVModel/)

v-model 绑定的快捷方式，props + emit -> ref

<details>
<summary>demo</summary><br>

```jsx
import { useVModel } from '@vueuse/core'

export default {
    setup(props, { emit }) {
        const data = useVModel(props, 'data', emit)

        console.log(data.value) // props.data
        data.value = 'foo' // emit('update:data', 'foo')
    },
}
```
<br></details>

7⃣️  工具分类(****Utilities****)：

⭐  ****reactivePick**** [https://vueuse.org/shared/reactivePick/](https://vueuse.org/shared/reactivePick/)

从一个响应式对象中选择字段。

<details>
<summary>demo</summary><br>

```jsx
import { reactivePick } from '@vueuse/core'

const obj = reactive({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
})

const picked = reactivePick(obj, 'x', 'elementX') // { x: number, elementX: number }
```
<br></details>

⭐  ****useBase64**** [https://vueuse.org/core/useBase64/](https://vueuse.org/core/useBase64/)

响应式的 base64 转换，支持纯文本, buffer, 文件, canvas 和 图片。

<details>
<summary>demo</summary><br>

```jsx
import { ref, Ref } from 'vue'
import { useBase64 } from '@vueuse/core'

const text = ref('')

const { base64 } = useBase64(text)
```
<br></details>

⭐  ****useCycleList**** [https://vueuse.org/core/useCycleList/](https://vueuse.org/core/useCycleList/)

环形查看一个项目列表。

<details>
<summary>demo</summary><br>

```jsx
import { useCycleList } from '@vueuse/core'

const { state, next, prev } = useCycleList([
    'Dog',
    'Cat',
    'Lizard',
    'Shark',
    'Whale',
    'Dolphin',
    'Octopus',
    'Seal',
])

console.log(state.value) // 'Dog'
prev()
console.log(state.value) // 'Seal'
```
<br></details>

⭐  ****useToggle**** [https://vueuse.org/shared/useToggle/](https://vueuse.org/shared/useToggle/)

带有工具函数的布尔值切换器。

<details>
<summary>demo</summary><br>

```jsx
import { useToggle } from '@vueuse/core'
const [value, toggle] = useToggle()
```
<br></details>

8⃣️  **配置** [https://vueuse.org/guide/config.html#configurations](https://vueuse.org/guide/config.html#configurations)

⭐  **事件过滤器**  [https://vueuse.org/guide/config.html#event-filters](https://vueuse.org/guide/config.html#event-filters)

可以更灵活地控制事件触发，提供了*防抖* 和*截流* ****的功能，也可以让事件*暂停* /继续触发。

<details>
<summary>demo</summary><br>

```jsx
import { throttleFilter, debounceFilter, useLocalStorage, useMouse } from '@vueuse/core'
// 防抖
const storage = useLocalStorage('my-key', { foo: 'bar' }, { eventFilter: throttleFilter(1000) })
// 截流
const { x, y } = useMouse({ eventFilter: debounceFilter(100) })
```

```jsx
import { pausableFilter, useDeviceMotion } from '@vueuse/core'
const motionControl = pausableFilter()
const motion = useDeviceMotion({ eventFilter: motionControl.eventFilter })

// 暂停
motionControl.pause() 
// 继续
motionControl.resume()
```
<br></details>

## 🚀 组件自动化加载

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 自动按需引入组件或指令，也无需注册，使用全局组件和 UI 组件库时更加方便。配置后，项目中放在 `'src/components'`, `'src/directives'` 目录下的组件 / 指令可在全局直接使用。

### ⚙️ 配置

```jsx
// vite.config.ts

import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        Components({
            dirs: ['src/components', 'src/directives'],
            extensions: ['vue', 'js'],
            include: [/\.vue$/, /\.vue\?vue/],
            dts: 'src/types/components.d.ts',
            resolvers: [
                ElementPlusResolver(),
            ]
        }),
    ],
})
```

+ `dirs` 指定查找组件的相对路径，此目录下的组件并非全局注册。
+ `dts: 'src/types/components.d.ts'` 表示生成全局类型声明文件，用于 volar 类型提示。
+ `ElementPlusResolver` 用于解析 element-plus 组件引入，包括 loading, popover, infinite-scroll 三个指令。

### 🧐 使用

```
./src
├── components
│   ├── FullLoading.vue
│   └── TabSelect.vue
├── directives
│   └── focus.js
```

```html
<template>
    <full-loading></full-loading>
    <el-button type="primary">btn</el-button>
    <input v-focus type="text" />
</template>
```

通过插件处理后，相当于：

```html
<template>
    <full-loading></full-loading>
    <el-button type="primary">btn</el-button>
    <input v-focus type="text" />
</template>

<script setup lang="ts">
import FullLoading from '@/components/FullLoading.vue';
import ElButton from 'element-plus/es/components/button';
import 'element-plus/lib/theme-chalk/base.css';
import 'element-plus/lib/theme-chalk/el-button.css';
import vFocus from '@/directives/focus.js';
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
                // 'vitest',
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
// .eslintrc.js

module.exports = { 
     extends: [
        // ...
        './.eslintrc-auto-import.json',
    ],
}
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
}
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

项目中图标的来源一般有三部分：

- **UI 组件库图标**。比如 @element-plus/icons-vue；
- **本地图标**。比如设计给的 svg 文件，从 iconfont 下载的 svg 文件等；
- **第三方图标库**。比如 FontAwesome, Material Design Icons, DashIcons, Feather Icons, EmojiOne, Noto Emoji 等。

通过 [Iconify](https://github.com/iconify/iconify) 图标框架，可以方便地使用**任何第三方图标库**（包括 element-plus, ant-design）。通过 [unplugin-icons](https://github.com/antfu/unplugin-icons) vite 插件实现**图标组件化**，可以将第三方图标库和本地图标包装成组件，它还提供了**自动安装**、**自动引入**、**按需加载**的功能。

### 📦 安装

Iconify 的图标资源可以通过 unplugin-icons 在需要的时候自动安装，项目中只手动安装了 unplugin-icons 插件。

### ⚙️ 配置

```jsx
// vite.config.ts
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                IconsResolver({
                    prefix: 'i',
                    customCollections: ['my-icons'],
                }),
            ],
        }),
        Icons({
            autoInstall: true,
            customCollections: {
                'my-icons': FileSystemIconLoader('./src/assets/icons'),
            },
        }),
    ],
});
```

配置说明：

- `autoInstall: true` 用于启用自动安装图标库的功能，使用图标无需提前安装。
- `IconsResolver` 用于将组件化后的图标组件自动引入，可以直接在 template 中使用。
- `prefix: 'i'` 用于设置组件的前缀，默认为 ‘i’，设置 false 表示无前缀。
- Icons `customCollections` 用于加载图标，将 './src/assets/icons' 目录下所有 svg 作为一个自定义的图标集。
- IconsResolver `customCollections: ['my-icons']` 添加自定义图标集。

还可以给所有图标设置默认配置：

```jsx
Icons({
    scale: 1.2, // Scale of icons against 1em
    defaultStyle: '', // Style apply to icons
    defaultClass: '', // Class names apply to icons
    compiler: null, // 'vue2', 'vue3', 'jsx'
    jsx: 'react' // 'react' or 'preact'
})
```

项目中使用了 Typescript，还需要添加类型声明文件 tsconfig.json：

```json
{
    "compilerOptions": {
        "types": [
            "unplugin-icons/types/vue"
        ]
    }
}
```

### 🧐 使用

使用一个图标，可以首先考虑第三方图标库：

1. 打开 [https://icones.js.org](https://icones.js.org/) 输入关键字搜索，如 ‘home’；
2. 在搜索结果中点击需要使用的图标，得到图标名称，如 ‘bx:home’。
3. 在模版中使用图标组件，组件名为 `i-bx-home` ，其中 ’i’ 表示组件前缀， ’bx’ 表示图标集，’home’ 表示图标名，如果项目中不存在 ’bx’ 时，会自动安装 ‘@iconify-json/bx’。

通过插件的处理，使用图标变得非常简单，需要写的代码量也非常少。不过需要按照 `{前缀}-{图标集}-{图标名}` 的命名规则去使用组件。

```html
<template>
    <i-bx-home></i-bx-home>  <!-- {prefix}-{collection}-{icon} -->
    <i-bx-home style="font-size: 40px; color: blue;"></i-bx-home>
</template>
```

对于本地图标，只需要把 svg 文件放到 ‘./src/assets/icons’ 目录即可，图标集为 ‘my-icons’，图标名为文件名，推荐使用小写字母，多个单词用短横线链接(kebab-case)：

```
src
└─ asstes
    └─ icons
        └─ about.svg
```

```html
<template>
    <i-my-icons-about></i-my-icons-about>
</template>
```

图标自动加载和组件自动加载一样，会生成对应的模块声明：

```jsx
// src/types/components.d.ts

declare module 'vue' {
    export interface GlobalComponents {
        IBxHome: typeof import('~icons/bx/home')['default']
        IMyIconsAbout: typeof import('~icons/my-icons/about')['default']
    }
}
```

如果不使用组件自动加载功能(unplugin-icons/resolver)，则需要先 import :

```html
<template>
    <bx-home></bx-home>
    <i-my-icons-about></i-my-icons-about>
</template>
<script setup lang="ts">
import BxHome from '~icons/bx/home’;
import MyIconsAbout from '~icons/my-icons/about’;
</script>
```

引入图标的路径 `~icons/*` 是一个虚拟路径，由 unplugin-icons 插件处理后，找到真实的 svg 文件，然后包装成 vue 组件返回。

> 使用 Iconify IntelliSense VS Code 插件，可以在代码中预览图标。

### 和 iconfont 字体图标比较

在 iconfont 上把所有需要的图标加入项目，再以 font-class 的方式使用是一个比较常见的做法，不过有以下问题：

- 首先需要先在平台上添加图标到项目，然后下载图标，最后再替换本地的文件，过程更繁琐；
- 文件包含所有图标，无法按需加载；
- 平台账号丢失，只能新建一个图标项目；
- 多色图标需要换用 svg 或者图片，造成项目中图标使用风格不统一；

## 🚀 Windi CSS

[Windi CSS](https://windicss.org/) 是下一代工具优先的 CSS 框架，通过扫描 HTML 和 CSS 按需生成工具类（utilities）。

### 组件化 / 原子化

使用 CSS 最原始的方式是：先给标签设置一个 class，再逐条写需要的样式，一些使用率高的样式会重复写很多次，开发效率较低，而且打包生成的 CSS 文件冗余。解决的方法可以使用 CSS 组件化和原子化。

**CSS 组件化：**

将相同视觉的 UI 封装成公共 class，在需要的标签上直接使用这个类名，一般一个 class 包含多条 CSS 样式，这类似于直接使用 bootstrap 或 element UI。使用组件化的 CSS，可以快速的完成效果，完全不需要动手写样式，缺点是不够灵活。

**CSS 原子化：**

原子化是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。有些人可能会称其为函数式 CSS，或者 CSS 实用工具。**Windi CSS** 就是采用原子化方案的框架。

随着构建工具的发展，工程化也是趋势，CSS 框架也会更细化，更工程化。CSS 原子化和组件化有不同的应用场景，两者结合使用可以最大限度的提升开发效率。

### ⚙️ 配置

首先，Windi CSS 需要一个配置文件：

```tsx
// windi.config.ts

import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    attributify: true,
    plugins: [
        require('windicss/plugin/line-clamp'),
    ],
});
```

以上配置中，`attributify: true` 表示开启[属性化模式](https://windicss.org/posts/v30.html#attributify-mode)；以及引入了 [line-clamp 插件](https://windicss.org/plugins/official/line-clamp.html)。

然后，在 Vite 配置中使用 [windicss 插件](https://github.com/windicss/vite-plugin-windicss)：

```tsx
// vite.config.ts

import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
    plugins: [
        WindiCSS(),
    ]
});
```

最后，在项目入口文件中引入相关 CSS：

```tsx
// main.ts

// windicss layers
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
// your custom styles here
// import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css';
// windicss devtools support (dev only)
import 'virtual:windi-devtools';
```

前三个 CSS 文件可以用 `virtual:windi.css` 代替，如果需要用自定义的样式覆盖某个生成的 CSS，分开导入可以更好地控制样式层顺序 ([layers ordering](https://windicss.org/integrations/vite.html#layers-ordering))；`import 'virtual:windi-devtools'` 表示可以在 DevTools 中修改类名查看效果，详细介绍可查看 [design-in-devtools](https://windicss.org/integrations/vite.html#design-in-devtools)。

更多配置选项以及 Vite 集成查看 [https://windicss.org/integrations/vite.html#configuration](https://windicss.org/integrations/vite.html#configuration)。Windi CSS  配置与 Tailwind CSS 相似，详细的配置说明可以参考 [Tailwind CSS - configuration](https://tailwindcss.com/docs/configuration)。

### 特性

1⃣️  **自动值推导** [https://cn.windicss.org/features/value-auto-infer.html](https://cn.windicss.org/features/value-auto-infer.html)

在类名中使用任意值，然后生成相应的样式，任意值可以是数字(表示 rem)、尺寸(px/vw/em/rem)、分数、颜色(rgba/hex)、变量(CSS变量名)。

```html
<div class="w-1/2 p-5px mt-10px bg-hex-b2a8bb"></div>
```

生成的 CSS 为：

```css
/* windicss layer utilities */
.bg-hex-b2a8bb {
    --tw-bg-opacity: 1;
    background-color: rgba(178, 168, 187, var(--tw-bg-opacity));
}
.mt-10px {
    margin-top: 10px;
}
.p-5px {
    padding: 5px;
}
.w-1\/2 {
    width: 50%;
}
```

2⃣️  **可变修饰组** [https://cn.windicss.org/features/variant-groups.html](https://cn.windicss.org/features/variant-groups.html)

通过使用括号对相同的工具类进行编组，将其应用于同一[可变修饰](https://cn.windicss.org/utilities/variants.html)。

```html
<div class="hover:(bg-red-200 font-bold)"></div>
```

生成的 CSS 为：

```css
.hover\:bg-red-200:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(87, 15, 15);
}
.hover\:font-bold:hover {
    font-weight: 700;
}
```

3⃣️  ****Shortcuts**** [https://cn.windicss.org/features/shortcuts.html](https://cn.windicss.org/features/shortcuts.html)

允许把工具类合集组合在一起，不需要重复写。

```tsx
// windi.config.ts
export default {
    theme: {
        /* ... */
    },
    shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    },
}
```

配置以上 shortcuts 后，使用 `btn` 和 `py-2 px-4 font-semibold rounded-lg shadow-md` 相同。

4⃣️  ****Important 前缀**** [https://cn.windicss.org/features/important-prefix.html](https://cn.windicss.org/features/important-prefix.html)

可以在任意工具类的前面使用 `!` 前缀，使它们变为 `!important` 。

```html
<div class="!text-black"></div>
```

生成的 CSS 为：

```css
.\!text-black {
    --tw-text-opacity: 1 !important;
    color: rgba(0, 0, 0, var(--tw-text-opacity)) !important;
}
```

5⃣️  ****指令**** [https://cn.windicss.org/features/directives.html](https://cn.windicss.org/features/directives.html)

`@apply` 指令用于应用工具类。可通过选择器复用一组工具类，和 shourtcuts 类似。

```html
<template>
    <button class="btn">btn1</button>
    <button class="btn">btn2</button>
</template>
<style>
.btn {
    @apply font-bold py-4px px-10px rounded;
}
</style>
```

生成的 CSS 为：

```css
.btn {
    border-radius: 0.25rem;
    font-weight: 700;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 10px;
    padding-right: 10px;
}
```

其他指令还有：`@variants`****,****  `@screen`, `@layer`, `theme()` 。

6⃣️  **属性化模式** [https://cn.windicss.org/features/attributify.html](https://cn.windicss.org/features/attributify.html)

为了避免 class 的值太多，造成代码的可读性降低，推荐使用属性化模式，将工具类分组，语法是：

```
(variant[:-]{1})*key? = "((variant:)*value)*"
```

```html
<button 
    bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    text="sm white"
    font="mono light"
    p="y-2 x-4"
    border="2 rounded blue-200"
>
    Button
</button>
```

<details>
<summary>生成的 CSS</summary><br>

```css
/* windicss layer utilities */
[bg~="blue-400"] {
    --tw-bg-opacity: 1;
    background-color: rgba(96, 165, 250, var(--tw-bg-opacity));
}
[bg~="hover:blue-500"]:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
}
.dark [bg~="dark:blue-500"] {
    --tw-bg-opacity: 1;
    background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
}
.dark [bg~="dark:hover:blue-600"]:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(37, 99, 235, var(--tw-bg-opacity));
}
[border~="blue-200"] {
    --tw-border-opacity: 1;
    border-color: rgba(191, 219, 254, var(--tw-border-opacity));
}
[border~="rounded"] {
    border-radius: 0.25rem;
}
[border~="2"] {
    border-width: 2px;
}
[font~="mono"] {
    font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}
[font~="light"] {
    font-weight: 300;
}
[text~="sm"] {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
[p~="y-2"] {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
[p~="x-4"] {
    padding-left: 1rem;
    padding-right: 1rem;
}
[text~="white"] {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
}
```
</details>

属性可能会名称冲突，可以通过配置自定义前缀解决：

```tsx
// windi.config.ts

export default {
    attributify: {
        prefix: 'w:',
    },
}
```

```tsx
<button w:bg="blue-400">btn</button>
```

因为出现命名冲突毕竟是少数，添加前缀写法更冗余，可以直接将有冲突的属性改为 class：

```html
<template>
    <a-component class="bg-blue-200" p="x-10px y-4px" bg="xxx"></a-component>
</template>
```

以上代码中，`bg` 为组件的 prop，与设置背景的属性冲突。

### 工具类

工具类的详细介绍可查看文档 [https://windicss.org/utilities/](https://windicss.org/utilities/)，也可以通过搜索快速找到需要的类。

### VS Code 插件

[Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) 通过提供给 Visual Studio Code 用户一些特性的方式来提高 Windi 的开发体验，例如：自动补全、语法高亮、代码折叠和构建。

## 🚀 样式

项目中依然采用 Less 作为 CSS 与处理器，因为 Windi CSS 还是不能完全摆脱手写 CSS，比如以下几种情况：

- 复杂选择器

```css
.container:hover {
    .item {
        background-color: #fff;
    }
    .text {
        color: red;
    }
}
```

- CSS function

```css
.container {
    height: calc(100vh - 10px);
}
```

- 多种属性复用

```css
.item {
    @apply p-2 border-b flex justify-between font-mono;
}
```

`./src/assets/styles/main.less` 可用于存放公共样式，如 UI 组件库样式改写等。

## 🚀 Stylelint

使用 [stylelint-config-tpconfig](https://github.com/CDTRSFE/stylelint-config-tpconfig) 的规则，可运行 `pnpm stylelint` 手动检测 src 目录下的样式文件。建议安装编辑器 [stylelint 插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，并开启保存时自动修复。

```jsx
// stylelint.config.js

module.exports = {
    extends: '@trscd/stylelint-config-tpconfig',
    ignoreFiles: ['./public/**/*'],
};
```

vscode settings.json：

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.stylelint": true
    }
}
```

## 🚀 Eslint

使用 [@trscd/eslint-config](https://github.com/CDTRSFE/eslint-config) 配置，对 JS，TS，Vue 代码做检测。

```jsx
// .eslintrc.js

module.exports = {
    extends: [
        '@trscd',
        './.eslintrc-auto-import.json',
    ],
};
```

其中 `.eslintrc-auto-import.json` 引入的是一些全局变量的配置，为了解决 [unplugin-auto-import ESLint 报错的问题](https://github.com/antfu/unplugin-auto-import#eslint---eslintno-undef) 。

## 🚀 版本控制

- 使用 [lint-staged](https://github.com/okonet/lint-staged) 在提交代码前执行 `pnpm lint` 和 `pnpm stylelint`，防止不规范的代码推送到远程仓库。
- 使用 [Commitizen](https://github.com/commitizen/cz-cli) + [Commitlint](https://github.com/conventional-changelog/commitlint) 对 commit message 做格式校验，可以使用 `git cz`
 代替 `git commit` 生成[符合规范](https://www.conventionalcommits.org/)的 message ，如 `feat(api): xxx`。

> 需要先全局安装 commitizen：`pnpm add -g commitizen` 。
