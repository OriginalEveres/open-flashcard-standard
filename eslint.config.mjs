import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Base JS recommended rules
    js.configs.recommended,

    // TypeScript recommended rules
    ...tseslint.configs.recommended,

    // Global ignores
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/*.js'],
    },

    // Core rules for all TypeScript source files
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            // ── TypeScript ────────────────────────────────────────────────────────

            // No implicit any — keeps the codebase fully typed
            '@typescript-eslint/no-explicit-any': 'error',

            // Enforce `import type` for type-only imports (matches trezor-suite style)
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],

            // Flag unused variables, but allow underscore-prefixed intentional ignores
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            // Disallow non-null assertions — use proper type narrowing instead
            '@typescript-eslint/no-non-null-assertion': 'error',

            // ── Imports ───────────────────────────────────────────────────────────

            // No duplicate imports from the same module
            'import/no-duplicates': 'error',

            // Enforce a consistent import order:
            //   1. Node built-ins  2. External packages  3. Internal paths
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],

            // ── General ───────────────────────────────────────────────────────────

            // Prefer const over let wherever possible
            'prefer-const': 'error',

            // No var — use const/let
            'no-var': 'error',

            // Warn on console usage — this is a library, not an app
            'no-console': 'warn',

            // Require a blank line before return statements for readability
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
            ],
        },
    },
);
