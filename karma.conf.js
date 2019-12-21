// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter'),
      require('karma-jasmine-diff-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/tdd-angular'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['jasmine-diff','mocha'],
    jasmineDiffReporter: {
      color: {
        expectedBg: 'bgMagenta',
        expectedWhitespaceBg: 'bgMagenta',
        actualBg: 'bgBlue',
        actualWhitespaceBg: 'bgBlue'
      },
      legacy: true
    },
    // mochaReporter: {
    //   output: 'minimal'
    // },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
