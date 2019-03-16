// eslint-disable-next-line no-undef
module.exports = {
	'extends': 'stylelint-config-standard',
	'rules': {
		'at-rule-no-unknown': [true, {
			'ignoreAtRules': ['extend', 'at-root', 'debug', 'warn', 'error', 'if', 'else', 'for', 'each', 'while', 'mixin', 'include', 'content', 'return', 'function']
		}],
		'color-no-invalid-hex': true,
		'string-quotes': 'single'
	}
};
