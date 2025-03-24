import { readFileSync } from 'fs';
import js from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import ts from 'typescript-eslint';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

// 读取自动导入配置
const autoImport = JSON.parse(readFileSync('./.eslintrc-auto-import.json', 'utf8'));

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        ignores: [
            'dist/**',
            'build/**',
            '*.min.js',
            'coverage/**',
            '.husky/**',
            '.vscode/**',
            'public/**',
            'src/types/auto-imports.d.ts',
            'src/types/components.d.ts',
            'index.html',
        ],
        languageOptions: {
            globals: {
                axios: 'readonly',
                ...autoImport.globals,
            },
        },
    },
    {
        plugins: {
            import: importPlugin,
            unicorn: unicornPlugin,
        },
        settings: {
            'import/resolver': {
                node: { extensions: ['.js', '.mjs', '.ts', '.d.ts'] },
            },
            'import/ignore': ['node_modules'],
        },
        rules: {
            // 基础规则
            'no-console': 'warn',
            'no-debugger': 'warn',
            // 缩进使用 4 个空格 默认就是4个
            'indent': ['error', 4, { SwitchCase: 1 }],
            // 使用驼峰命名约定
            // 'camelcase': ['warn', { properties: 'always' }],
            // 禁止函数圆括号之前有空格
            'space-before-function-paren': ['error', 'never'],
            // 当最后一个元素或属性与闭括号 ] 或 } 在不同的行时，要求使用拖尾逗号；当在同一行时，禁止使用拖尾逗号
            'comma-dangle': ['error', 'always-multiline'],
            // generator 函数中 * 号左边有空格右边不允许有空格? es6建议星号后面有空格，前面没有
            'generator-star-spacing': ['error', 'after'],
            // 语句末尾使用分号
            'semi': ['error', 'always'],
            // 强制最大连续空行数为1，强制文件末尾和文件开始的最大连续空行数为1和0
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
            // 强制在 yield* 表达式中前面没空格后面有空格
            'yield-star-spacing': ['error', { before: false, after: true }],
            // 限制函数块中的语句的最大数量
            'max-statements': ['error', { max: 20 }, { ignoreTopLevelFunctions: true }],
            // 无需严格遵循回调模式，在回调的第一个位置显示未定义的、 null 或错误对象
            'n/no-callback-literal': 0,
            // 不用强制统一 promise 的回调参数名为 resolve 和 reject
            'promise/param-names': 0,
            // 如果有属性名称要求使用引号，则所有的属性名称都要使用引号
            'quote-props': ['error', 'consistent-as-needed'],
            'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
            // 回调函数尽可能用箭头函数
            'prefer-arrow-callback': 'error',
            // 用 ES6 简写的形式去定义对象中的方法和属性
            'object-shorthand': ['error', 'always'],
            // 使用剩余参数代替 arguments
            'prefer-rest-params': 'error',
            // 使用扩展语法而非 .apply()
            'prefer-spread': 'error',
            // 使用模板字面量而非字符串拼接
            'prefer-template': 'error',
            // 箭头函数参数在可以省略括号的地方不使用括号
            'arrow-parens': ['error', 'as-needed'],
            // 变量的使用限制在其定义的作用域范围内
            'block-scoped-var': 'error',
            // 不建议使用 alert、confirm 和 prompt
            'no-alert': 'warn',
            'import/order': 'error',
            'import/no-mutable-exports': 'error',
            'import/no-unresolved': 'off',
            'import/no-absolute-path': 'off',

            // unicorns
            // Improve regexes by making them shorter, consistent, and safer
            'unicorn/better-regex': 'error',
            // Pass error message when throwing errors
            'unicorn/error-message': 'error',
            // Require Array.isArray() instead of instanceof Array
            'unicorn/no-instanceof-array': 'error',
            // Prevent calling EventTarget#removeEventListener() with the result of an expression
            'unicorn/no-invalid-remove-event-listener': 'error',
            // Improved version of the no-nested-ternary ESLint rule, which allows cases where the nested ternary is only one level and wrapped in parens.
            'unicorn/no-nested-ternary': 'error',
            // Forbid classes that only have static members
            'unicorn/no-static-only-class': 'error',
            // Disallow unnecessary spread
            'unicorn/no-useless-spread': 'error',
            // Disallow number literals with zero fractions or dangling dots
            'unicorn/no-zero-fractions': 'error',
            // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
            'unicorn/number-literal-case': 'error',
            // Prefer .addEventListener() and .removeEventListener() over on-functions
            'unicorn/prefer-add-event-listener': 'error',
            // Prefer .find(…) over the first element from .filter(…)
            'unicorn/prefer-array-find': 'error',
            // Prefer Array#flat() over legacy techniques to flatten arrays
            'unicorn/prefer-array-flat': 'error',
            // Prefer .flatMap(…) over .map(…).flat()
            'unicorn/prefer-array-flat-map': 'error',
            // Prefer Date.now() to get the number of milliseconds since the Unix Epoch
            'unicorn/prefer-date-now': 'error',
            // Prefer default parameters over reassignment
            'unicorn/prefer-default-parameters': 'error',
            // Prefer .includes() over .indexOf() and Array#some() when checking for existence or non-existence
            'unicorn/prefer-includes': 'error',
            // Prefer String#startsWith() & String#endsWith() over RegExp#test()
            'unicorn/prefer-string-starts-ends-with': 'error',
            // Prefer ternary expressions over simple if-else statements
            'unicorn/prefer-ternary': 'error',
            // Enforce throwing TypeError in type checking conditions
            'unicorn/prefer-type-error': 'error',
            // Require new when throwing an error
            'unicorn/throw-new-error': 'error',
        },
    },
    {
        files: ['*.vue', '**/*.vue'],
        plugins: {
            vue: eslintPluginVue,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            // 每行最多的属性个数
            'vue/max-attributes-per-line': ['error', {
                singleline: 5,
            }],
            // 标签自闭和
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'never',
                },
                svg: 'any',
                math: 'any',
            }],
            // 组件 name 属性值的格式（驼峰）
            'vue/component-definition-name-casing': 'error',
            // 允许使用 v-html
            'vue/no-v-html': 0,
            // 定义 vue 中 html 缩进
            'vue/html-indent': ['error', 4],
            // 带属性的 html 元素内容不能保持单行
            'vue/singleline-html-element-content-newline': 'error',
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        files: ['**/*.{ts,tsx,vue}'],
        plugins: {
            '@typescript-eslint': ts.plugin,
        },
        rules: {
            // 关闭原生规则，使用 typescript-eslint 规则替代
            'no-unused-vars': 'off',
            'no-use-before-define': 'off',
            'no-redeclare': 'off',
            '@typescript-eslint/no-unused-vars': ["error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                }],
            '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
            '@typescript-eslint/no-redeclare': 'error',
            '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
            '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
            '@typescript-eslint/prefer-ts-expect-error': 'error',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
        },
    },
];
