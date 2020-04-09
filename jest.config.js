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
