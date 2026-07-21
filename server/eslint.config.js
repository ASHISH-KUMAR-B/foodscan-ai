import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/venv/**",
      "**/.venv/**",
      "**/dist/**",
      "**/build/**"
    ],
  },

  js.configs.recommended,

  {
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
];