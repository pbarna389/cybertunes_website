import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unicorn from 'eslint-plugin-unicorn'
import sonarjs from 'eslint-plugin-sonarjs'
import security from 'eslint-plugin-security'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	{
		ignores: ['node_modules', 'src/generated/**', '.next', 'next-env.d.ts']
	},
	...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true
			},
			ecmaVersion: 2022,
			globals: globals.browser
		},
		plugins: {
			'react-hooks': reactHooks,
			'simple-import-sort': simpleImportSort,
			unicorn,
			sonarjs,
			security
		},
		rules: {
			// ✅ React hooks
			...reactHooks.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',

			// ✅ TypeScript strictness
			'@typescript-eslint/no-throw-literal': 'off', // Let TS handle
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/array-type': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/method-signature-style': 'error',
			'@typescript-eslint/dot-notation': 'error',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
			'@typescript-eslint/no-require-imports': 'error',
			'@typescript-eslint/prefer-find': 'warn',
			'@typescript-eslint/prefer-function-type': 'error',
			'@typescript-eslint/prefer-literal-enum-member': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/prefer-string-starts-ends-with': 'error',
			'@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
			'@typescript-eslint/member-ordering': [
				'warn',
				{
					default: {
						memberTypes: ['field', 'signature', 'constructor', 'method'],
						order: 'alphabetically-case-insensitive',
						optionalityOrder: 'required-first'
					}
				}
			],
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksVoidReturn: { attributes: false }
				}
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: false,
					fixStyle: 'separate-type-imports'
				}
			],

			// ✅ General JS best practices
			'no-shadow': 'off', // handled by TS
			'object-shorthand': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'warn',
			'prefer-rest-params': 'error',
			'prefer-destructuring': ['error', { array: false, object: true }],
			'no-var': 'error',
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-console': 'warn',
			'no-useless-return': 'error',
			'no-nested-ternary': 'error',
			'no-else-return': 'error',
			'array-callback-return': ['error', { allowImplicit: true, checkForEach: false }],
			'default-case': 'error',
			'default-case-last': 'error',
			'default-param-last': 'error',

			// ✅ Import sorting
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^import\\s+type\\s+.*'],
						['^next/*'],
						['^react', '^react-dom', '^react-router', '^react-router-dom', '^react-dom/client'],
						[
							'^@reduxjs',
							'^@tanstack',
							'^styled-components',
							'^nextui',
							'^react-.*',
							'^swiper',
							'^formik',
							'^react-hook-form',
							'@hookform/*',
							'^@react-oauth',
							'^@react-icons'
						],
						['^@*'],
						[
							'^@query',
							'^@services',
							'^@store',
							'^@slices',
							'^@context',
							'^@reducers',
							'^@layout',
							'^@pages',
							'^@components',
							'^@hooks',
							'^@helpers',
							'^@utils',
							'^@constants',
							'^@types'
						],
						[
							'^./query',
							'^./services',
							'^./store',
							'^./slices',
							'^./context',
							'^./reducers',
							'^./components',
							'^./pages',
							'^./hooks',
							'^./helpers',
							'^./utils',
							'^./constants',
							'^./types'
						],
						['^@/actions'],
						['^\\./', '^\\../'],
						['^@storybook', '^@assets', '^./assets/*', '^.*\\.svg$'],
						['^prisma*'],
						['^@/db'],
						['^.*\\.(ts|tsx)$'],
						['^.*\\.(css|scss)$']
					]
				}
			],
			'simple-import-sort/exports': 'error',

			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: 'directive', next: 'import' }
			],

			// ✅ Unicorn rules
			'unicorn/prefer-ternary': 'error',
			'unicorn/prefer-switch': 'warn',
			'unicorn/consistent-function-scoping': 'error',
			'unicorn/no-useless-undefined': 'error',
			'unicorn/prefer-modern-math-apis': 'error',
			'unicorn/no-array-reduce': 'warn',

			// ✅ SonarJS (cognitive complexity, duplications)
			'sonarjs/no-duplicate-string': 'warn',
			'sonarjs/no-identical-functions': 'error',
			'sonarjs/cognitive-complexity': ['warn', 20],

			// ✅ Security
			'security/detect-object-injection': 'warn',
			'security/detect-non-literal-fs-filename': 'error'
		}
	}
]

export default eslintConfig
