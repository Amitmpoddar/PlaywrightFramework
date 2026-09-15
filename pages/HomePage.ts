import { Page, Locator, expect } from "@playwright/test";

export class HomePage {

    readonly page: Page;

  

   

    // Page Elements
    readonly swaglabsText: Locator;
    readonly productText: Locator;
    readonly addtocartButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {

        this.page = page;

        // Hea

        // Content
        this.swaglabsText =  page.getByText('Swag Labs');
        this.productText =  page.getByText("Products");
        this.addtocartButton = page .locator('.inventory_item')
                                     .filter({ hasText: 'Sauce Labs Backpack' })
                                     .getByRole('button', { name: 'Add to cart' }); 
                                    
                                    
       this.cartLink=  page.locator('.shopping_cart_link');
    }

       
    

    async navigate(): Promise<void> {
     await this.page.goto("/inventory.html")
        
    }

    async   clickAddToCartButton(): Promise<void> {
        this.addtocartButton.click();
        
    }

    async   clickCartLink(): Promise<void> {
        this.cartLink.click();
        
    }
}