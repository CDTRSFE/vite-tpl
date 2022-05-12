module.exports = {
    extends: '@trscd/stylelint-config-tpconfig',
    ignoreFiles: ['./public/**/*'],
    rules: {
        // https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep'] }],
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
        // https://windicss.org/features/directives.html
        'at-rule-no-unknown': [true, { ignoreAtRules: ['apply', 'variants', 'screen', 'layer'] }],
        // https://windicss.org/features/directives.html#theme
        'function-no-unknown': [true, { ignoreFunctions: ['theme'] }],
        'declaration-no-important': null,
    },
};
