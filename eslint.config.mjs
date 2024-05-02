import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    {
        files: ["src/**/*.ts"],
        rules: {
            "prefer-const": "error",
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
