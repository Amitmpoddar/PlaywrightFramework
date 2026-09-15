import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.resolve(
    process.cwd(),
    "playwright",
    ".auth",
    "user.json"
);

setup("Login", async ({ page }) => {

    await page.goto("/");

    await page.getByPlaceholder("Username")
        .fill("standard_user");

    await page.getByPlaceholder("Password")
        .fill("secret_sauce");

    await page.getByRole("button", { name: "Login" })
        .click();

    await expect(page).toHaveURL(
        "https://www.saucedemo.com/inventory.html"
    );

    // 1. Capture the raw state into memory
    const state = await page.context().storageState();

    // Calculate a synchronized future epoch time
    const exactNowSeconds = Math.floor(Date.now() / 1000);
    const oneYearLaterSeconds = exactNowSeconds + (60 * 60 * 24 * 365);
    const oneYearLaterMilliseconds = oneYearLaterSeconds * 1000;

    // 2. Patch the Cookie array
    state.cookies = state.cookies.map(cookie => {
        if (cookie.name === "session-username") {
            cookie.expires = oneYearLaterSeconds;
        }
        return cookie;
    });

    // 3. Patch the LocalStorage origins array to match the cookie shift
    state.origins = state.origins.map(origin => {
        if (origin.origin === "https://www.saucedemo.com") {
            origin.localStorage = origin.localStorage.map(item => {
                if (item.name === "backtrace-last-active") {
                    item.value = String(oneYearLaterMilliseconds);
                }
                return item;
            });
        }
        return origin;
    });

    // 4. Ensure directory exists and save state
    const dir = path.dirname(authFile);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(authFile, JSON.stringify(state, null, 2));

    console.log("Saved dynamic, synchronized auth state to:", authFile);
});
