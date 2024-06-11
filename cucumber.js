module.exports = {
    default: [
        '--format-options \'{"snippetInterface": "synchronous"}\'',
        '--require-module ts-node/register', // Load TypeScript module
        '--require test/features/steps/**/*.e2e-spec.ts', // Load step definitions
        '--format @cucumber/pretty-formatter', // Load pretty console formatter
        '--format html:test/report/cucumber.html', // Load html formatter
        '--format json:test/report/cucumber.json', // Load json formatter
        '--fail-fast',
        'test/features', // Specify feature files directory
    ].join(' '),
}