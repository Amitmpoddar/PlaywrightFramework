import {test} from "../../fixtures/baseFixture"
import {Page,expect}  from '@playwright/test';
import { ENV } from "../../config/env";



test("validate Headers", async ({ homePage,page }) => {

       console.log("Environment:", ENV.name);
    console.log("Base URL:", ENV.baseURL);
    console.log("Test URL:", page.url());

        
         
        await expect(homePage.swaglabsText).toHaveText("Swag Labs")
        await expect(homePage.productText).toHaveText("Products")
       

    });

test("Click Add to Cart Button", async ({ homePage}) => {

       

        
         
        
        await homePage.clickAddToCartButton();

    });
