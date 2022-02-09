module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        // '@vue/standard',
        'tpconfig',
        '@vue/typescript/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    globals: {
        _: 'readonly',
        axios: 'readonly',
    },
    ignorePatterns: ['/public/**/*.js'],
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx'],
    //         extends: [
    //             '@vue/typescript/recommended',
    //         ],
    //     },
    // ],
    rules: {
        // off
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 1,
    },
};
