module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended', // For Vue 3
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'semi': ['error', 'always'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: '*' }, // Require one empty line before statements
        ],
        'space-in-parens': ['error', 'always'], // Require a space after parentheses
    },
};
