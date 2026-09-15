# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\Home.spec.ts >> validate Headers
- Location: tests\ui\Home.spec.ts:7:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByText('Swag Labs')
Expected: "Swag Lab"
Received: "Swag Labs"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByText('Swag Labs')
    23 × locator resolved to <div class="app_logo">Swag Labs</div>
       - unexpected value "Swag Labs"

```

```yaml
- text: Swag Labs
```

# Test source

```ts
  1  | import {test} from "../../fixtures/baseFixture"
  2  | import {Page,expect}  from '@playwright/test';
  3  | import { ENV } from "../../config/env";
  4  | 
  5  | 
  6  | 
  7  | test("validate Headers", async ({ homePage,page }) => {
  8  | 
  9  |        console.log("Environment:", ENV.name);
  10 |     console.log("Base URL:", ENV.baseURL);
  11 |     console.log("Test URL:", page.url());
  12 | 
  13 |         
  14 |          
> 15 |         await expect(homePage.swaglabsText).toHaveText("Swag Lab")
     |                                             ^ Error: expect(locator).toHaveText(expected) failed
  16 |         await expect(homePage.productText).toHaveText("Products")
  17 |        
  18 | 
  19 |     });
  20 | 
  21 | test("Click Add to Cart Button", async ({ homePage}) => {
  22 | 
  23 |        
  24 | 
  25 |         
  26 |          
  27 |         
  28 |         await homePage.clickAddToCartButton();
  29 | 
  30 |     });
  31 | 
```