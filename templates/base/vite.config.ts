import path from 'path';
import { defineConfig } from 'vite';
import type { ConfigEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import {
    VueUseDirectiveResolver,
    VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers';
import strip from '@rollup/plugin-strip';
import ImportIcons, { ImportIconsResolver } from 'vite-plugin-import-icons';
import zipPack from 'vite-plugin-zip-pack';
import UnoCSS from 'unocss/vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import { uiResolver } from './ui.config';

// 项目文件夹名
const folderName = path.basename(__dirname);

export default (env: ConfigEnv) => {
    return defineConfig({
        server: {
            // https://cn.vitejs.dev/config/#server-proxy
            proxy: {
                '/mock': 'https://trsyapi.trscd.com.cn',
            },
        },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
        base: './',
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: '@import "@/assets/styles/mixin.less";',
                },
            },
        },
        plugins: [
            VueDevTools(),
            Vue(),
            vueJsx(),
            // 生产环境删除 debugger 和 console
            env.mode === 'production' &&
                strip({
                    include: ['**/*.js', '**/*.ts', '**/*.vue'],
                }),
            // https://github.com/antfu/unplugin-vue-components
            Components({
                dirs: ['src/components'],
                deep: false,
                extensions: ['vue', 'js', 'ts'],
                globsExclude: ['**/*.{test,spec}.{js,ts}'],
                include: [/\.vue$/, /\.vue\?vue/],
                // 生成全局类型声明文件，以便 volar 类型提示
                dts: 'src/types/components.d.ts',
                resolvers: [
                    uiResolver,
                    ImportIconsResolver(),
                    VueUseDirectiveResolver(),
                    VueUseComponentsResolver(),
                ],
            }),
            ImportIcons({
                collections: {
                    icons: path.resolve(__dirname, './src/assets/icons'),
                },
                // transform(svg, collection, icon) {
                //     // apply fill to this icon on this collection
                //     if (collection === 'icons' && icon === 'account') {
                //         return svg.replace(/^<svg /, '<svg fill="currentColor" ');
                //     }
                //     return svg;
                // },
            }),
            zipPack({
                outDir: './',
                outFileName: `${folderName}.zip`,
            }),
            UnoCSS(),
        ],
    });
};
