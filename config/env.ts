import dotenv from "dotenv";
import path from "path";
import fs from "fs";


// =====================================================
// SELECT ENVIRONMENT
// =====================================================

const environment =
  process.env.TEST_ENV || "qa";


// =====================================================
// ENVIRONMENT FILE PATH
// =====================================================

const envFilePath =
  path.resolve(
    process.cwd(),
    "env",
    `.env.${environment}`
  );


// =====================================================
// LOAD ENV FILE IF IT EXISTS
// =====================================================
//
// Local execution:
//   .env.qa exists → load it
//
// Jenkins:
//   .env.qa does not exist → continue
//   Jenkins provides environment variables
// =====================================================

if (fs.existsSync(envFilePath)) {

  dotenv.config({
    path: envFilePath
  });

} else {

  console.log(
    `Environment file not found: ${envFilePath}`
  );

  console.log(
    "Using environment variables provided by the system/CI."
  );
}


// =====================================================
// REQUIRED ENVIRONMENT VARIABLES
// =====================================================

const requiredVariables = [

  "ENV",
  "BASE_URL",
  "API_BASE_URL",
  "BROWSER",
  "HEADLESS",
  "DEFAULT_TIMEOUT",
  "EXPECT_TIMEOUT",
  "TEST_USERNAME",
  "TEST_PASSWORD",
  "AUTH_URL",
  "CLIENT_ID",
  "CLIENT_SECRET"

];


// =====================================================
// VALIDATE REQUIRED VARIABLES
// =====================================================

for (
  const variable of requiredVariables
) {

  if (!process.env[variable]) {

    throw new Error(
      `Missing environment variable: ${variable}`
    );

  }

}


// =====================================================
// CENTRALIZED ENVIRONMENT CONFIGURATION
// =====================================================

export const ENV = {

  name:
    process.env.ENV!,

  baseURL:
    process.env.BASE_URL!,

  apiBaseURL:
    process.env.API_BASE_URL!,

  browser: {

    name:
      process.env.BROWSER!,

    headless:
      process.env.HEADLESS === "true"

  },

  user: {

    username:
      process.env.TEST_USERNAME!,

    password:
      process.env.TEST_PASSWORD!

  },

  admin: {

    username:
      process.env.ADMIN_USERNAME,

    password:
      process.env.ADMIN_PASSWORD

  },

  api: {

    authURL:
      process.env.AUTH_URL!,

    clientId:
      process.env.CLIENT_ID!,

    clientSecret:
      process.env.CLIENT_SECRET!

  },

  timeout: {

    default:
      Number(
        process.env.DEFAULT_TIMEOUT
      ),

    expect:
      Number(
        process.env.EXPECT_TIMEOUT
      )

  },

  paths: {

    testData:
      process.env.TEST_DATA_PATH,

    upload:
      process.env.UPLOAD_PATH

  },

  database: {

    host:
      process.env.DB_HOST,

    port:
      Number(
        process.env.DB_PORT
      ),

    name:
      process.env.DB_NAME,

    username:
      process.env.DB_USERNAME,

    password:
      process.env.DB_PASSWORD

  },

  feature: {

    mock:
      process.env.ENABLE_MOCK === "true",

    apiLog:
      process.env.ENABLE_API_LOG === "true",

    trace:
      process.env.ENABLE_TRACE === "true"

  }

};