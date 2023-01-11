const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://autotests.example.ru',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: '[datetime]-[name]-report',
      charts: true,
      reportPageTitle: 'SUT cypress tests',
      embeddedScreenshots: true,
      inlineAssets: true,
      timestamp: 'yyyy_mm_dd-HH_MM_ss',
      // не перезаписывать отчеты тест-комплектов в формате JSON
      overwrite: false,
      // не создавать промежуточные отчеты в формате HTML
      html: false,
      // создавать промежуточные отчеты в формате HTML
      json: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    viewportHeight: 1280,
    viewportWidth: 1920,
  },
});
