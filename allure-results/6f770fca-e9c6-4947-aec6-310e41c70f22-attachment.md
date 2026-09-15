# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\Cart.spec.ts >> click continue shopping
- Location: tests\ui\Cart.spec.ts:5:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Go back Continue Shopping' })

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic [ref=f1e4]:
    - banner [ref=f1e5]:
      - generic [ref=f1e6]:
        - generic [ref=f1e7]:
          - button "Open Menu" [ref=f1e8] [cursor=pointer]
          - img "Open Menu" [ref=f1e9]
        - generic [ref=f1e10]: Swag Labs
        - button "Cart, empty" [ref=f1e13]
      - generic [ref=f1e14]: Your Cart
    - main [ref=f1e16]:
      - generic [ref=f1e17]:
        - generic [ref=f1e18]:
          - generic [ref=f1e19]: QTY
          - generic [ref=f1e20]: Description
        - generic [ref=f1e21]:
          - button "Continue Shopping" [ref=f1e22] [cursor=pointer]
          - button "Checkout" [ref=f1e23] [cursor=pointer]
  - contentinfo [ref=f1e24]:
    - list [ref=f1e25]:
      - listitem [ref=f1e26]:
        - link "X" [ref=f1e27] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=f1e28]:
        - link "Facebook" [ref=f1e29] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=f1e30]:
        - link "LinkedIn" [ref=f1e31] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=f1e32]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { Page, Locator, expect } from "@playwright/test";
  2  | import { HomePage } from "./HomePage";
  3  | 
  4  | export class CartPage {
  5  | 
  6  |     readonly page: Page;
  7  | 
  8  |   
  9  | 
  10 |    
  11 | 
  12 |     // Page Elements
  13 |     readonly continueShopping: Locator;
  14 |     readonly yourCartText: Locator;
  15 |     readonly popupsLink: Locator;
  16 | 
  17 |     constructor(page: Page) {
  18 | 
  19 |         this.page = page;
  20 | 
  21 |         // Hea
  22 | 
  23 |         // Content
  24 |         this.continueShopping = page.getByRole('button', {name:'Go back Continue Shopping'});
  25 |         this.yourCartText = page.getByText("Your Cart");
  26 |         this.popupsLink = page.getByRole('link', {name:'Popups'});
  27 |     }
  28 | 
  29 |    
  30 | 
  31 |     async clickContinueShoppingButton(): Promise<void> {
> 32 |         await this.continueShopping.click();
     |                                     ^ Error: locator.click: Test timeout of 60000ms exceeded.
  33 |         
  34 |     
  35 |     }
  36 | 
  37 |     async clickFormfieldsLink(): Promise<void> {
  38 |        // await this.formfieldsLink.click();
  39 |         
  40 |     }
  41 | 
  42 |     async verifyCartText(): Promise<void> {
  43 |       await  expect(this.yourCartText).toHaveText("Your Cart")
  44 |         
  45 |     }
  46 | 
  47 | }
```