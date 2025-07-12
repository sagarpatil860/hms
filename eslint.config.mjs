// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"; // Includes eslint-config-prettier

// If you plan to add jsx-a11y or import plugins later:
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginImport from "eslint-plugin-import";

export default tseslint.config(
  // 1. Core ESLint Recommended Rules
  eslint.configs.recommended,

  // 2. TypeScript ESLint Recommended & Stylistic Rules (with type checking)
  // These provide best practices and consistent style for TypeScript code.
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // 3. React Specific Rules
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply these rules only to TS and TSX files
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "jsx-a11y": eslintPluginJsxA11y, // Uncomment if using jsx-a11y plugin
      import: eslintPluginImport, // Uncomment if using import plugin
    },
    extends: [
      // Extends recommended configurations from the React plugins
      // This is often more concise than listing all rules individually.
      // Make sure eslintPluginReact.configs.recommended is correctly applied
      // ESLint Flat Config handles extends slightly differently, you include the rules directly.
      // So, manually spreading the rules as you did is correct.
    ],
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Configure import/order rule here
      "import/order": [
        "error", // You can set this to 'warn' if you prefer warnings
        {
          groups: [
            "builtin", // Node.js built-in modules (e.g., path, fs)
            "external", // Third-party libraries (e.g., react, lodash)
            "internal", // Your own internal modules using aliases or specific patterns
            "parent", // Imports from parent directories (e.g., ../components)
            "sibling", // Imports from sibling directories (e.g., ./utils)
            "index", // Imports from the current directory's index file (e.g., './')
            "object", // Imports that use the object grouping (less common)
            "type", // Type-only imports (e.g., import type { MyType } from './types')
          ],
          pathGroups: [
            // Rule for React first (position before any 'external' import)
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            // Rule for React hooks (if you have a consistent path for them, e.g., 'src/hooks/**')
            // Otherwise, they'll fall into 'internal' or 'parent/sibling' depending on their path
            {
              pattern: "src/hooks/**", // Adjust this pattern if your hooks are elsewhere
              group: "internal", // Treat hooks as internal components
              position: "after", // Position after other 'internal' modules if you want hooks last among internals
            },
            // Example for placing specific local imports as 'internal'
            {
              pattern: "components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "utils/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "internal"], // Exclude 'react' from generic external group if handled by pathGroups
          "newlines-between": "always", // Enforce a newline between import groups
          alphabetize: {
            order: "asc", // Sort imports alphabetically within each group
            caseInsensitive: true,
          },
        },
      ],
      "padding-line-between-statements": [
        "error", // Set to 'error' to enforce, or 'warn' for warnings
        { blankLine: "always", prev: ["block", "block-like"], next: "*" }, // Enforce newline AFTER a block (e.g., function, class, if/else block)
        { blankLine: "always", prev: "*", next: ["block", "block-like"] },
      ],
      // 🚫 Disallow console logs
      "no-console": "error",

      // 🚫 Disallow alert, confirm, prompt
      "no-alert": "error",

      // 🚫 Disallow inline styles in JSX
      // "no-inline-styles/no-inline-styles": "error",

      // 🚫 Enforce function declarations for React components
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression",
        },
      ],

      // 🚫 Disallow use of `any` type
      "@typescript-eslint/no-explicit-any": "error",

      // 🚫 Disallow nested ternaries
      "no-nested-ternary": "error",

      // 🚫 Disallow use of `eval()`
      "no-eval": "error",

      // 🚫 Disallow debugger statements
      "no-debugger": "error",

      // 🚫 Disallow reassignment of function parameters
      "no-param-reassign": "error",

      // Other import-related rules you might find useful:
      "import/no-unresolved": "error", // Ensure imports point to a file/module that can be resolved.
      "import/named": "error", // Ensure named imports correspond to a named export.
      "import/no-cycle": "error", // Forbid a module from importing a module with a dependency path back to itself.
      "import/no-relative-parent-imports": "warn", // Forbid importing modules from parent directories. (You might want this as 'error' or adjust based on aliases)
      "import/no-duplicates": "error", // Forbid repeated import of the same module.
      "import/first": "error", // Ensure all imports appear before other statements.
      "import/newline-after-import": "error", // Ensure there's a newline after the last import statement.
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          // Enforce or ban file extensions for imports
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ], // Enforce type-only imports for types
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version from package.json
      },
      "import/resolver": {
        // Uncomment if using eslint-plugin-import
        typescript: true,
        node: true,
      },
    },
  },

  // 4. TypeScript Parser Configuration
  // This block ensures ESLint uses the TypeScript parser and type information.
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json", // Path to your main tsconfig.json
        tsconfigRootDir: import.meta.dirname, // Helps resolve tsconfig path correctly
        sourceType: "module", // Enable ES module syntax
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    // No 'files' here as it's implied by tseslint.config() being the base
  },

  // 5. Custom TypeScript Rules
  {
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }], // Changed to warn for flexibility
      // Add or override specific TypeScript rules here
    },
  },

  // 6. Overrides for Plain JavaScript/ESM Files (disables type-checking)
  // {
  //   files: ["**/*.js", "**/*.mjs", "**/*.cjs"], // Apply to JS, MJS, CJS files
  //   ...tseslint.configs.disableTypeChecked, // Disable type checking for these files
  //   rules: {
  //     // You can add basic JS-specific rules here if needed, e.g.,
  //     // 'no-var': 'error', // Enforce 'const'/'let' over 'var'
  //   },
  // },

  // 7. Global Ignores (Consolidated and simplified)
  {
    ignores: [
      "**/node_modules/", // Standard ignore
      "**/dist/", // Standard ignore for build output
      "**/build/", // Standard ignore for build output
      "**/public/", // Standard ignore for public assets
      "*.config.js", // Ignore config files like webpack.*.js, eslint.config.js itself
      "*.config.mjs", // Ignore config files like eslint.config.mjs itself
      ".config/*", // Ignore all files within a .config folder
      "webpack.common.js",
      "webpack.dev.js",
      "webpack.prod.js",
      "jest.config.cjs",
      "jest.setup.ts",
    ],
  },

  // 8. Prettier Integration (MUST BE THE LAST CONFIG)
  // This plugin turns off ESLint rules that conflict with Prettier's formatting,
  // and enables the "prettier/prettier" rule to report formatting differences as ESLint errors.
  // It effectively bundles `eslint-config-prettier` and `eslint-plugin-prettier`.
  eslintPluginPrettierRecommended,
);
