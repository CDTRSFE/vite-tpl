import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        Vue(),
        // https://github.com/antfu/unplugin-vue-components
        Components({
            // todo
            dirs: ['src/components', 'src/directives'],
            deep: false,
            extensions: ['vue', 'js'],
            include: [/\.vue$/, /\.vue\?vue/],
            // 生成全局类型声明文件，以便 volar 类型提示
            dts: 'src/types/components.d.ts',
            resolvers: [
                name => {
                    // console.log(name);
                    if (name === 'TabSelect') {
                        return { path: '@/components/' + name + '/Index.vue' };
                    }
                },
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'i',
                    customCollections: ['my-icons'],
                }),
            ],
        }),
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
        Icons({
            autoInstall: true,
            customCollections: {
                'my-icons': FileSystemIconLoader('./src/assets/icons'),
            },
        }),
        WindiCSS(),
    ],
});
