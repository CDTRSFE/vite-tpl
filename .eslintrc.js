module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        // https://eslint.vuejs.org/user-guide/#compiler-macros-such-as-defineprops-and-defineemits-generate-no-undef-warnings
        'vue/setup-compiler-macros': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        // '@vue/standard',
        '@vue/typescript/recommended',
        'tpconfig',
        './.eslintrc-auto-import.json',
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
        // Don't use `{}` as a type
        '@typescript-eslint/ban-types': 'warn',
        'vue/multi-word-component-names': 'off',
    },
};
