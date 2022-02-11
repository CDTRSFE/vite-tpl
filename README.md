# Vite 项目模版

## 🚀 PNPM

快速的，节省磁盘空间的包管理工具。[https://pnpm.io/zh/](https://pnpm.io/zh/)

- **减少磁盘空间占用**

所有安装的包都会存储在磁盘上的某一位置，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间，允许跨项目共享同一版本的依赖。这也提高了安装速度；

如果用到了某依赖项的不同版本，那么只会将有差异的文件添加到仓库。 `pnpm update` 时只会向存储中心额外添加新文件，而不会复制整新版本包的内容。

- **创建非扁平化的 node_modules 文件夹**

第二个特点是，使用 pnpm 项目中 node_modules 目录结构不再是扁平化，这种布局的一大好处是只有真正在依赖项中的包才能访问。[pnpm 项目 node_modules 目录结构](https://pnpm.io/zh/symlinked-node-modules-structure)

### 📦 安装和升级

```bash
npm install -g pnpm  # 安装
pnpm add -g pnpm     # 升级
```

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

避免安装时用错包管理器，在 package.json 中添加 preinstall 脚本，限制[只允许使用 pnpm](https://pnpm.io/zh/only-allow-pnpm)：

```json
{
	"scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

## 🚀 VueUse

一个基于 Composition API 的工具函数集，同时支持 Vue2 / Vue 3。[https://github.com/vueuse/vueuse](https://github.com/vueuse/vueuse)

VueUse 使用 vue-demi 实现对 Vue2 的支持，vue-demi 内部会对 Vue 版本做判断，如果是 Vue2 则使用 `@vue/composition-api` ，判断的过程在安装 vue-demi 之前，可以在 [package.json](https://github.com/vueuse/vue-demi/blob/master/package.json#L34) 中找到 `scripts.postinstall: ‘node ./scripts/postinstall.js’` ，虽然包的入口文件都是 `lib/index.cjs`, 它会根据项目中安装的 Vue 版本来修改入口文件的内容。

### 📦 安装

```bash
npm i @vueuse/core
```

### 🧐 使用

工具库划分了几个大类：broswer(浏览器相关)，Sensors(传感器相关)，Animation(动画相关)，Component，常用的有：

1️⃣  **浏览器分类(Browser)**：

⭐  **useClipboard** [https://vueuse.org/core/useClipboard/](https://vueuse.org/core/useClipboard/)

使用 **[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)，**提供响应剪切板命令（剪切/复制/粘贴）的功能，可以异步地读写系统剪切板。

- demo
  
    ```jsx
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
    

⭐  **useEventListener** [https://vueuse.org/core/useEventListener/](https://vueuse.org/core/useEventListener/)

更容易地使用事件监听器，自动地在 mounted 时注册事件，在 unmounted 时移除事件监听。

- demo
  
    ```jsx
    import { useEventListener } from '@vueuse/core'
    
    const element = ref<HTMLDivElement>()
    useEventListener(element, 'keydown', (e) => { console.log(e.key) })
    ```
    

⭐  **useMediaControls** [https://vueuse.org/core/useMediaControls](https://vueuse.org/core/useMediaControls/#demo)/

用于 audio 和 video 标签的响应式媒体控制。

- demo
  
    ```jsx
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
    

⭐  **useScriptTag** [https://vueuse.org/core/useScriptTag/](https://vueuse.org/core/useScriptTag/)

script 标签注入。当组件 mounted 时自动加载 script，组件卸载时自动移除。也可通过配置手动控制 script 加载时机。

- demo
  
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
    

⭐  **useUrlSearchParams** [https://vueuse.org/core/useurlsearchparams](https://vueuse.org/core/useurlsearchparams/?foo=bar&vueuse=awesome#useurlsearchparams)

响应式的 **[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)，**可以读取或修改 url 参数，直接 history，hash 模式。

- demo
  
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
    

2️⃣  **传感器分类(Sesors)**：

⭐  **onClickOutside** [https://vueuse.org/core/onClickOutside/](https://vueuse.org/core/onClickOutside/)

监听元素外部的点击事件，对弹框和下拉框很有用。

- demo
  
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
    
    或者使用无无渲染组件 *`OnClickOutside` :*
    
    ```jsx
    <OnClickOutside @trigger="fn">
      <div>
        Click Outside of Me
      </div>
    </OnClickOutside>
    ```
    

⭐  **useMouse** [https://vueuse.org/core/useMouse/](https://vueuse.org/core/useMouse/)

响应式鼠标位置。

- demo
  
    ```jsx
    import { useMouse } from '@vueuse/core'
    
    const { x, y, sourceType } = useMouse()
    // sourceType: "mouse" | "touch" | null
    ```
    

⭐  **useScroll** [https://vueuse.org/core/useScroll/](https://vueuse.org/core/useScroll/)

响应式的滚动位置和状态，返回滚动距离、到达状态、滚动方向、是否在滚动中，可以配置偏移量、截流、滚动回调函数等。

- demo
  
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
    

3️⃣  **动画分类(Animation)**：

⭐  **useIntervalFn** [https://vueuse.org/shared/useIntervalFn/](https://vueuse.org/shared/useIntervalFn/)

带控制器的 setInterval 包装器，可以调用暂停、继续方法。

- demo
  
    ```jsx
    import { useIntervalFn } from '@vueuse/core'
    
    const { pause, resume, isActive } = useIntervalFn(() => {
      /* your function */
    }, 1000)
    ```
    

⭐  **useRafFn** [https://vueuse.org/core/useRafFn/](https://vueuse.org/core/useRafFn/)

带有暂停/继续控制器的 requestAnimationFrame。

- demo
  
    ```jsx
    import { ref } from 'vue'
    import { useRafFn } from '@vueuse/core'
    
    const count = ref(0)
    
    const { pause, resume } = useRafFn(() => {
      count.value++
      console.log(count.value)
    })
    ```
    

⭐  **useTimeoutFn** [https://vueuse.org/shared/useTimeoutFn/](https://vueuse.org/shared/useTimeoutFn/)

带控制器的 setTimeout 包装器，可以调用 stop 手动停止、调用 start 重新开始。

- demo
  
    ```jsx
    import { useTimeoutFn } from '@vueuse/core'
    
    const { isPending, start, stop } = useTimeoutFn(() => {
      /* ... */
    }, 3000)
    ```
    

⭐  **useTransition** [https://vueuse.org/core/useTransition/](https://vueuse.org/core/useTransition/)

值之间的过渡。返回一个被监听的数值，当源数值改变，输出会过度到新值。如果源值在过渡的过程中被改变，一个新的过渡会从中断的地方开始。

- demo
  
    ```jsx
    import { ref } from 'vue';
    import { useTransition, TransitionPresets } from '@vueuse/core'
    
    const source = ref(0)
    const output = useTransition(source, {
      duration: 500, // 默认 1000
      transition: TransitionPresets.easeInOutCubic // 默认 linear 线性过渡
    })
    ```
    

4️⃣  **状态分类(State)**：

⭐  **useStorage** [https://vueuse.org/core/useStorage/](https://vueuse.org/core/useStorage/)

响应式的 **[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**/**[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)。**

- demo
  
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
    

⭐  **createGlobalState** [https://vueuse.org/shared/createGlobalState/](https://vueuse.org/shared/createGlobalState/)

将状态保留在全局范围内，以便在 Vue 实例之间可重用。相当于响应式的全局变量。

- demo
  
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
    

5️⃣  **元素分类(Elements)**：

⭐  **useElementBounding** [https://vueuse.org/core/useElementBounding/](https://vueuse.org/core/useElementBounding/)

使用了 [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) API 获取一个元素的大小及其相对于视口的位置，页面滚动或者元素改变时会更新返回值。

- demo
  
    ```jsx
    import { useElementBounding } from '@vueuse/core'
    
    const { x, y, top, right, bottom, left, width, height } = useElementBounding(el)
    ```
    

⭐  **useMouseInElement** [https://vueuse.org/core/useMouseInElement/](https://vueuse.org/core/useMouseInElement/)

鼠标相对于一个元素的位置。

- demo
  
    ```jsx
    import { useMouseInElement } from '@vueuse/core'
    
    // 鼠标相对于 target 左上角的坐标、鼠标是否在 target 外
    const { x, y, isOutside, stop } = useMouseInElement(target)
    // 停止监听 target 和鼠标的位置
    stop()
    ```
    

⭐  **useMutationObserver** [https://vueuse.org/core/useMutationObserver/](https://vueuse.org/core/useMutationObserver/)

监听 DOM 树的改变。**[MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)**

- demo
  
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
    

⭐  **useWindowScroll** [https://vueuse.org/core/useWindowScroll/](https://vueuse.org/core/useWindowScroll/)

响应式窗口滚动。

- demo
  
    ```jsx
    import { useWindowScroll } from '@vueuse/core'
    
    const { x, y } = useWindowScroll()
    ```
    

⭐  **useWindowSize** [https://vueuse.org/core/useWindowSize/](https://vueuse.org/core/useWindowSize/)

响应式窗口大小。

- demo
  
    ```jsx
    import { useWindowSize } from '@vueuse/core'
    
    const { width, height } = useWindowScroll()
    ```
    

6️⃣  **组件分类(Componet)**：

⭐  **useTemplateRefsList** [https://vueuse.org/core/useTemplateRefsList/](https://vueuse.org/core/useTemplateRefsList/)

在 v-for 中绑定 refs 到模版和组件的一个快捷方式，比原本的写法 [v-for 中的 Ref 数组](https://v3.cn.vuejs.org/guide/migration/array-refs.html#%E8%BF%81%E7%A7%BB%E7%AD%96%E7%95%A5) 更简洁。

- demo
  
    ```jsx
    <template>
      <div v-for="i of 5" :key="i" :ref="refs.set"></div>
    </template>
    
    <script setup lang="ts">
    import { onUpdated } from 'vue'
    import { useTemplateRefsList } from '@vueuse/core'
    
    const refs = useTemplateRefsList<HTMLDivElement>()
    
    onUpdated(() => {
      console.log(refs)
    })
    </script>
    ```
    

⭐  **useVirtualList** [https://vueuse.org/core/useVirtualList/](https://vueuse.org/core/useVirtualList/)

轻松创建虚拟列表。虚拟列表可以高效地渲染大量项目。

- demo
  
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
    

⭐  **useVModel** [https://vueuse.org/core/useVModel/](https://vueuse.org/core/useVModel/)

v-model 绑定的快捷方式，props + emit -> ref

- demo
  
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
    

7⃣️  工具分类(****Utilities****)：

⭐  ****reactivePick**** [https://vueuse.org/shared/reactivePick/](https://vueuse.org/shared/reactivePick/)

从一个响应式对象中选择字段。

- demo
  
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
    

⭐  ****useBase64**** [https://vueuse.org/core/useBase64/](https://vueuse.org/core/useBase64/)

响应式的 base64 转换，支持纯文本, buffer, 文件, canvas 和 图片。

- demo
  
    ```jsx
    import { ref, Ref } from 'vue'
    import { useBase64 } from '@vueuse/core'
    
    const text = ref('')
    
    const { base64 } = useBase64(text)
    ```
    

⭐  ****useCycleList**** [https://vueuse.org/core/useCycleList/](https://vueuse.org/core/useCycleList/)

环形查看一个项目列表。

- demo
  
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
    

⭐  ****useToggle**** [https://vueuse.org/shared/useToggle/](https://vueuse.org/shared/useToggle/)

带有工具函数的布尔值切换器。

- demo
  
    ```jsx
    import { useToggle } from '@vueuse/core'
    const [value, toggle] = useToggle()
    ```
    

### ⚙️ 配置

⭐  **事件过滤器**  [https://vueuse.org/guide/config.html#event-filters](https://vueuse.org/guide/config.html#event-filters)

可以更灵活地控制事件触发，提供了*防抖* 和*截流* ****的功能，也可以让事件*暂停* /继续触发。

- demo
  
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
    

## 🚀 组件自动化加载

<aside>
💡 todo: 全局组件查找范围是指定目录下 (src/components) 的所有 vue 文件，配置不够灵活，将 components 文件夹下的 vue 文件和子目录下的 Index.vue 文件作为需要导出的全局组件无法实现。

</aside>

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 自动按需引入组件或指令，可在模版中直接使用，也无需注册，使用全局组件和 UI 组件库时更加方便。

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

`dirs` 指定查找组件的相对路径，此目录下的组件并非全局注册。

`dts: 'src/types/components.d.ts'` 表示生成全局类型声明文件，用于 volar 类型提示。

`ElementPlusResolver` 用于解析 element-plus 组件引入，包括 loading, popover, infinite-scroll 三个指令。

### 🧐 使用

```
./src
├── components
│   ├── FullLoading.vue
│   └── TabSelect
│       └── Index.vue
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
    <full-loading name="1"></full-loading>
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

`include` 指定需要转换的目标文件，自动引入 API 可以在 js, ts, jsx, tsx, vue 文件中使用。

`imports` 添加了 vue, vue-router, @vueuse/core 三个包，使用时无需导入。

`dts: 'src/types/auto-imports.d.ts'` 用于生成类型声明文件。

`eslintrc` 启用此项配置为了解决 [ESLint 提示 eslint(no-undef) 的问题](https://github.com/antfu/unplugin-auto-import#eslint---eslintno-undef)，会生成一个 ./.eslintrc-auto-import.json 文件，将自动引入的 API 作为全局变量处理，需要在 ESLint 配置文件中作为扩展添加：

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

## 🚀 Eslint

使用 eslint-config 库，分别对 js，ts，vue 添加规则。

> Vite 官方文档：[https://cn.vitejs.dev/](https://cn.vitejs.dev/)
> Vite Awsome：[https://github.com/vitejs/awesome-vite](https://github.com/vitejs/awesome-vite)
> Vitesse 项目模版：[https://github.com/antfu/vitesse](https://github.com/antfu/vitesse)