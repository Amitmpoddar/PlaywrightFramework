
import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./config/env";
import path from "path";

const authFile = path.resolve(
  process.cwd(),
  "playwright",
  ".auth",
  "user.json"
);

// --------------------------------------------------
// Report paths
// --------------------------------------------------

const reportPrefix = process.env.REPORT_PREFIX || "default";

const htmlReport = `reports/${reportPrefix}/html-report`;
const jsonReport = `reports/${reportPrefix}/results.json`;
const junitReport = `reports/${reportPrefix}/results.xml`;
const allureResults = `allure-results/${reportPrefix}`;

export default defineConfig({

  // --------------------------------------------------
  // Test location
  // --------------------------------------------------

  testDir: "./tests",

  // --------------------------------------------------
  // Global timeout
  // --------------------------------------------------

  timeout: ENV.timeout.default,

  // --------------------------------------------------
  // Assertion timeout
  // --------------------------------------------------

  expect: {
    timeout: ENV.timeout.expect
  },

  // --------------------------------------------------
  // Parallel execution
  // --------------------------------------------------

  fullyParallel: true,

  // --------------------------------------------------
  // Prevent accidental test.only in CI
  // --------------------------------------------------

  forbidOnly: !!process.env.CI,

  // --------------------------------------------------
  // Retry failed tests in CI
  // --------------------------------------------------

  retries: process.env.CI ? 2 : 0,

  // --------------------------------------------------
  // Parallel workers
  // --------------------------------------------------

  workers: process.env.CI ? 2 : undefined,

  // --------------------------------------------------
  // Reports
  // --------------------------------------------------

  reporter: [

    // Console
    ["list"],

    // HTML
    [
      "html",
      {
        outputFolder: htmlReport,
        open: "never"
      }
    ],

    // JSON
    [
      "json",
      {
        outputFile: jsonReport
      }
    ],

    // JUnit
    [
      "junit",
      {
        outputFile: junitReport
      }
    ],

    // Allure
    [
      "allure-playwright",
      {
        resultsDir: allureResults
      }
    ]
  ],

  // --------------------------------------------------
  // Common settings
  // --------------------------------------------------

  use: {

    baseURL: ENV.baseURL,

    headless: ENV.browser.headless,

    viewport: {
      width: 1920,
      height: 1080
    },

    ignoreHTTPSErrors: true,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure"
  },

  // --------------------------------------------------
  // Projects
  // --------------------------------------------------

  projects: [

    // --------------------------------
    // Authentication setup
    // --------------------------------

    {
      name: "setup",

      testMatch: "**/*.setup.ts"
    },

    // --------------------------------
    // UI - Chromium
    // --------------------------------

    {
      name: "chromium",

      testDir: "./tests/ui",

      use: {
        ...devices["Desktop Chrome"],

        storageState: authFile
      },

      dependencies: [
        "setup"
      ]
    },

    // --------------------------------
    // API
    // --------------------------------

    {
      name: "api",

      testDir: "./tests/api",

      use: {
        baseURL: ENV.apiBaseURL
      }
    }
  ],

  // --------------------------------------------------
  // Test artifacts
  // --------------------------------------------------

  outputDir: "test-results/"
});
