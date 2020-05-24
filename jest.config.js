var path = require('path')
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.test')
})

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "collectCoverage": true,
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{js,vue}",
    "!<rootDir>/src/App.vue",
    "!<rootDir>/src/main.js",
    "!**/node_modules/**",
    "!<rootDir>/dist/**",
    "!<rootDir>/src/plugins/**",
    "!<rootDir>/tests/unit/**"
  ],
  "coverageReporters": ["lcov", "text-summary"],
  "snapshotSerializers": ["jest-serializer-html"],
  testMatch: [
    "<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)",
    "<rootDir>/**/__tests__/*.(js|jsx|ts|tsx)",
    "<rootDir>/src/**/*.test.js"
  ],
  verbose: true,
  "setupFilesAfterEnv": ["jest-extended"]
}
