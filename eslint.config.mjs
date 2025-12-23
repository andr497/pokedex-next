import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
    {
        extends: [...nextCoreWebVitals],

        plugins: {
            "@typescript-eslint": typescriptEslint,
        },

        rules: {
            "react-hooks/exhaustive-deps": "off",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
]);
