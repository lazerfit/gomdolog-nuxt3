import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
	rules: {
		semi: 'error',
		eqeqeq: 'error',
		'no-shadow-restricted-names': 'error',
		'no-unused-labels': 'error',
		'no-useless-catch': 'error',
		'no-useless-escape': 'error',
		'no-with': 'error',
		'require-yield': 'error',
		'no-case-declarations': 'error',
		'no-delete-var': 'error',
		'no-empty': 'error',
		'no-empty-static-block': 'error',
		'no-extra-boolean-cast': 'error',
		'no-global-assign': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-redeclare': 'error',
		'no-regex-spaces': 'error',
		'first-attribute-linebreak': false,
	},
});
