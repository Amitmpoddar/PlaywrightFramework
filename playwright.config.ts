import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./config/env";
import path from "path";

const authFile = path.resolve(
  process.cwd(),
  "playwright",
  ".auth",
  "user.json"
);

export default defineConfig({

  // Test location
  testDir: "./tests",

  // Global timeout
  timeout: ENV.timeout.default,

  // Assertion timeout
  expect: {
    timeout: ENV.timeout.expect
  },

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 2 : undefined,

  // Reports
  reporter: [

    // Console report
    ["list"],

    // Playwright HTML report
    [
      "html",
      {
        outputFolder: "reports/html-report",
        open: "never"
      }
    ],

    // JSON report
    [
      "json",
      {
        outputFile: "reports/results.json"
      }
    ],

    // JUnit report
    [
      "junit",
      {
        outputFile: "reports/results.xml"
      }
    ],

    // Allure report
    [
      "allure-playwright",
      {
        resultsDir: "allure-results"
      }
    ]
  ],

  // Common settings
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

  // Projects
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

      use: {
        ...devices["Desktop Chrome"],

        storageState: authFile
      },

      dependencies: [
        "setup"
      ]
    },

    // --------------------------------
    // API Tests
    // --------------------------------
    {
      name: "api",

      testDir: "./tests/api",

      use: {
        baseURL: ENV.apiBaseURL
      }
    }
  ],

  // Output folder
  outputDir: "test-results/"
});