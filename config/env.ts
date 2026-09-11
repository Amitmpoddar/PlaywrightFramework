import dotenv from "dotenv";
import path from "path";

const environment = process.env.TEST_ENV || "qa";

const envFilePath = path.resolve(
  process.cwd(),
  "env",
  `.env.${environment}`
);

const config = dotenv.config({
  path: envFilePath
});

if (config.error) {
  throw new Error(
    `Environment file not found: ${envFilePath}`
  );
}


// Required environment variables
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

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Missing environment variable: ${variable}`
    );
  }
}


// Centralized environment configuration
export const ENV = {

  name: process.env.ENV!,

  baseURL: process.env.BASE_URL!,

  apiBaseURL: process.env.API_BASE_URL!,

  browser: {
    name: process.env.BROWSER!,

    headless:
      process.env.HEADLESS === "true"
  },

  user: {
    username: process.env.TEST_USERNAME!,
    password: process.env.TEST_PASSWORD!
  },

  admin: {
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!
  },

  api: {
    authURL: process.env.AUTH_URL!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!
  },

  timeout: {
    default: Number(process.env.DEFAULT_TIMEOUT),
    expect: Number(process.env.EXPECT_TIMEOUT)
  },

  paths: {
    testData: process.env.TEST_DATA_PATH!,
    upload: process.env.UPLOAD_PATH!
  },

  database: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!
  },

  feature: {
    mock: process.env.ENABLE_MOCK === "true",
    apiLog: process.env.ENABLE_API_LOG === "true",
    trace: process.env.ENABLE_TRACE === "true"
  }
};