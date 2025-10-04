const eslint = require("@eslint/js");
const nextPlugin = require("@next/eslint-plugin-next");
const globals = require("globals");

module.exports = [
    eslint.configs.recommended,
    {
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs["core-web-vitals"].rules,
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": "off",
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-undef": "off",
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                React: "readonly",
            },
        },
    },
];
