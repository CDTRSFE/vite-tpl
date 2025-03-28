import { presetAttributify, presetWind3, defineConfig } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';

export default defineConfig({
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    },
    theme: {
        colors: {
            primary: '#1F76E5',
        },
    },
    presets: [presetAttributify(), presetWind3()],
    transformers: [transformerDirective()],
    rules: [
        [
            /^scrollbar-([^-]+)(-(.+))?$/,
            ([, d, , value], { rawSelector }) => {
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
            },
        ],
        // 文本超出省略
        // usage: class="ellipsis ellipsis-2 ellipsis-3"
        [
            /^ellipsis(-(\d*))?$/,
            ([, , d], { rawSelector }) => {
                return `.${rawSelector} {${
                    Number(d) > 1
                        ? `overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: ${d}; -webkit-box-orient: vertical;`
                        : 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
                }}`;
            },
        ],
    ],
});
