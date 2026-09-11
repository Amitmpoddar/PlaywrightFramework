import {
    test as base,
    APIRequestContext,
    request
} from "@playwright/test";

import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";

type Fixtures = {
    cartPage: CartPage;
    homePage: HomePage;
    apiContext: APIRequestContext;
};

export const test = base.extend<Fixtures>({

    // Login Page
    cartPage: async ({ page }, use) => {

        const cartPage = new CartPage(page);

        await use(cartPage);
    },


    // Home Page
    homePage: async ({ page }, use) => {

        const homePage = new HomePage(page);

        console.log("Before navigation:", page.url());

        await homePage.navigate();

        console.log("After navigation:", page.url());

        await use(homePage);
    },


    // API Context
    apiContext: async ({}, use) => {

        const apiContext = await request.newContext({
            ignoreHTTPSErrors: true
        });

        await use(apiContext);

        await apiContext.dispose();
    }

});

export { expect } from "@playwright/test";