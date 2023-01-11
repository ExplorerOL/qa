const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://autotests.example.ru',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'SUT cypress tests',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1280,
    viewportWidth: 1920,
  },
});
