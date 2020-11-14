module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
		"no-console": "off",
		"no-undef": "off",
		"no-unused-vars": "off",
        "arrow-parens": [
            "error",
            "always"
        ],
    }
};