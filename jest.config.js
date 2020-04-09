// TODO: load these from the .env.test file for wallaby (they don't have to be in wallaby.js)
process.env.WEBSOCKET_URL = "ws://localhost:11/status"

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "collectCoverage": true,
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{js,vue}",
    "!**/node_modules/**",
    "!<rootDir>/dist/**",
    "!<rootDir>/src/plugins/**",
    "!<rootDir>/tests/unit/**"
  ],
  "coverageReporters": ["lcov", "text-summary"],
  "snapshotSerializers": ["jest-serializer-html"]
}
