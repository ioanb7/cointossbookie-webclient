module.exports = {
    "ecmaFeatures": {
        "modules": true,
        "spread": true,
        "restParams": true
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    },
    "rules": {
        "no-unused-vars": 2,
        "no-undef": 2
    },
    "parserOptions": {
        parser: "babel-eslint"
    },
    "extends": ["plugin:vue/base"]
}