import { defineConfig } from 'vitest/config';
import type { ConfigEnv } from 'vite';
import viteConfig from './vite.config';

export default defineConfig((configEnv) => {
    const viteConfiguration = viteConfig(configEnv as ConfigEnv);

    return {
        ...viteConfiguration,
        test: {
            globals: true,
            environment: 'jsdom',
            include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
            exclude: ['**/node_modules/**', '**/dist/**'],
            root: '.',
            testTransformMode: {
                web: ['.jsx', '.tsx', '.vue'],
            },
            setupFiles: ['./test/setup.ts'],
            server: {
                deps: {
                    inline: ['element-plus', 'axios'],
                },
            },
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*.{vue,js,ts,jsx,tsx}'],
                exclude: [
                    '**/*.d.ts',
                    'src/main.ts',
                    'src/plugins/**',
                    'test/**',
                    'src/router/**',
                    'src/store/**',
                    'src/hooks/**',
                    'src/directives/**',
                    'src/store/**',
                ],
                thresholds: {
                    lines: 80,
                    functions: 70,
                    branches: 70,
                    statements: 80,
                },
            },
        },
    };
});
