import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
    ...nextVitals,
    ...nextTypescript,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-undef": "off",
        },
    },
    prettier,
]);
