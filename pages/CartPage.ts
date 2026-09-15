import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";

export class CartPage {

    readonly page: Page;

  

   

    // Page Elements
    readonly continueShopping: Locator;
    readonly yourCartText: Locator;
    readonly popupsLink: Locator;

    constructor(page: Page) {

        this.page = page;

        // Hea

        // Content
        this.continueShopping = page.getByRole('button', {name:'Go back Continue Shopping'});
        this.yourCartText = page.getByText("Your Cart");
        this.popupsLink = page.getByRole('link', {name:'Popups'});
    }

   

    async clickContinueShoppingButton(): Promise<void> {
        await this.continueShopping.click();
        
    
    }

    async clickFormfieldsLink(): Promise<void> {
       // await this.formfieldsLink.click();
        
    }

    async verifyCartText(): Promise<void> {
      await  expect(this.yourCartText).toHaveText("Your Cart")
        
    }

}