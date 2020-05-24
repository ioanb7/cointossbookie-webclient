module.exports = () => ({
    autoDetect: true,
    files: [
        'src/**/*.js'
    ],

    tests: [
        'test/**/*spec.js',
        'src/**/*.test.js'
    ],

    reportConsoleErrorAsError: true,
    lowCoverageThreshold: 99,
    runAllTestsInAffectedTestFile: true
});