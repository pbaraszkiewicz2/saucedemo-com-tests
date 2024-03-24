const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportHeight: 1080,
    viewportWidth: 1920,
    chromeWebSecurity: false,
  },
});
