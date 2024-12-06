module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		extraFileExtensions: [".vue"],
		sourceType: "module",
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"prettier/prettier": [
			"error",
			{ useTabs: true, singleQuote: false, endOfLine: "lf" },
		],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	},
};
