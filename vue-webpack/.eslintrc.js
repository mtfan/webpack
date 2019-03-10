module.exports = {
	root: true,
	"env": {
		"node": true,
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"parser": "babel-eslint",
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"html",
		"vue"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		]
	}
};