import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./config/env";
//import dotenv from 'dotenv';
//import path from 'path';
import path from "path";

const authFile = path.resolve(process.cwd(), "playwright", ".auth", "user.json");




export default defineConfig({

  // Test location
  testDir: "./tests",


  // Global timeout for each test
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


  // Test execution reporting
  reporter: [

    [
      "list"
    ],

    [
      "html",
      {
        outputFolder: "reports/html-report",
        open: "never"
      }
    ],

    [
      "json",
      {
        outputFile: "reports/results.json"
      }
    ],

    [
      "junit",
      {
        outputFile: "reports/results.xml"
      }
    ]

  ],



  // Shared settings for all tests
  use: {


    // Application URL from env file
    baseURL: ENV.baseURL,


    // Browser mode
    headless: ENV.browser.headless,


    // Browser viewport
    viewport: {
      width: 1920,
      height: 1080
    },


    // Ignore SSL issues in QA/UAT
    ignoreHTTPSErrors: true,


    // Capture screenshot only on failure
    screenshot: "only-on-failure",


    // Video recording
    video: "retain-on-failure",


    // Trace for debugging
    trace: "retain-on-failure"

  },



  // Browser projects
  projects: [


    // Authentication setup
    {
      name: "setup",

      testMatch:
        "**/*.setup.ts"

    },


    // Chromium execution
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


    // // Firefox execution
    // {
    //   name: "firefox",

    //   use: {
    //     ...devices["Desktop Firefox"]
    //   },

    //   dependencies: [
    //     "setup"
    //   ]

    // },


    // // WebKit execution
    // {
    //   name: "webkit",

    //   use: {
    //     ...devices["Desktop Safari"]
    //   },

    //   dependencies: [
    //     "setup"
    //   ]

    // }

  ],



  // Output folder
  outputDir:
    "test-results/"

});