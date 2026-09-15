import {test} from "../../fixtures/baseFixture"
import {Page,expect}  from '@playwright/test';
import { ENV } from "../../config/env";

// test("click continue shopping", async ({ homePage,cartPage }) => {


        
         
//          await homePage.clickAddToCartButton();
//          await homePage.clickCartLink();
//          await cartPage.clickContinueShoppingButton();
//     });



    test("verify cart text", async ({ homePage,cartPage }) => {


        
         
         await homePage.clickAddToCartButton();
         await homePage.clickCartLink();
         await cartPage.verifyCartText();
    });