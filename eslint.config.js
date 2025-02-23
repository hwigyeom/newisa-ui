import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import imports from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import lit from 'eslint-plugin-lit';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import ts from 'typescript-eslint';

/* @type {import('eslint').Linter} */
export default [
  {
    ignores: [
      '**/dist/**/*',
      '**/storybook-static/*',
      '**/node_modules/**/*',
      '**/coverage/**/*',
      'packages/**/*.{js,d.ts,d.ts.map}',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  { plugins: { prettier: prettierPlugin } },
  imports.flatConfigs.recommended,
  lit.configs['flat/recommended'],
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs['recommended-latest'],
  ...storybook.configs['flat/recommended'],
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: false,
          projects: ['apps/**/tsconfig.json', 'packages/**/tsconfig.json'],
        },
      },
      parser: '@typescript-eslint/parser',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': { descriptionFormat: '^: TS\\d+ .*$' },
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-check': false,
          minimumDescriptionLength: 10,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@ntils{,-wc,-react}/**',
              group: 'internal',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
];
