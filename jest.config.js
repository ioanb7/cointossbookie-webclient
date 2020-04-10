// TODO: load these from the .env.test file for wallaby (they don't have to be in wallaby.js)
process.env.VUE_APP_WEBSOCKET_URL = "ws://localhost:11/status"

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
  verbose: true
}
