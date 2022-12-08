import path from 'path';
import { defineConfig } from 'vite';
import type { ConfigEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver, VueUseDirectiveResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import strip from '@rollup/plugin-strip';
import Unocss from 'unocss/vite';
import { presetAttributify, presetWind } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';
import ImportIcons, { ImportIconsResolver } from 'vite-plugin-import-icons';

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
            Vue(),
            // 生产环境删除 debugger 和 console
            env.mode === 'production' && strip({
                include: ['**/*.js', '**/*.ts', '**/*.vue'],
            }),
            // https://github.com/antfu/unplugin-vue-components
            Components({
                dirs: ['src/components'],
                deep: false,
                extensions: ['vue', 'js', 'ts'],
                include: [/\.vue$/, /\.vue\?vue/],
                // 生成全局类型声明文件，以便 volar 类型提示
                dts: 'src/types/components.d.ts',
                resolvers: [
                    AntDesignVueResolver(),
                    ImportIconsResolver(),
                    VueUseDirectiveResolver(),
                    VueUseComponentsResolver(),
                ],
            }),
            AutoImport({
                include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
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
            Unocss({
                shortcuts: {
                    'flex-center': 'flex items-center justify-center',
                },
                theme: {
                    colors: {
                        primary: '#1F76E5',
                    },
                },
                presets: [
                    presetAttributify(),
                    presetWind(),
                ],
                transformers: [
                    transformerDirective(),
                ],
                rules: [
                    [/^scrollbar-([^-]+)(-(.+))?$/, ([, d,, value], { rawSelector }) => {
                        let p = '';
                        if (!value) {
                            p = `width: ${d}; height: ${d}`;
                        }
                        if (d === 'w') {
                            p = `width: ${value}`;
                        } else if (p === 'h') {
                            p = `height: ${value}`;
                        }
                        return `.${rawSelector}::-webkit-scrollbar {
                            ${p}
                        }`;
                    }],
                    // 文本超出省略
                    // usage: class="ellipsis ellipsis-2 ellipsis-3"
                    [/^ellipsis(-(\d+))?$/, ([,, d], { rawSelector }) => {
                        return `.${rawSelector} {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: ${d || 1};
                            -webkit-box-orient: vertical;
                        }`;
                    }],
                ],
            }),
        ],
    });
};
