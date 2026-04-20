# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test\order-price.spec.ts >> Ordenamiento de productos - SauceDemo Shopify >> Debe ordenar los productos por precio: menor a mayor
- Location: test\order-price.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Sort')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - search:
          - button "Submit" [ref=e6] [cursor=pointer]
          - textbox "Search" [ref=e7]
      - navigation [ref=e9]:
        - link "Search" [ref=e10] [cursor=pointer]:
          - /url: /search
        - link "About Us" [ref=e11] [cursor=pointer]:
          - /url: /pages/about-us
        - link "Log In" [ref=e12] [cursor=pointer]:
          - /url: /account/login
        - link "Sign up" [ref=e13] [cursor=pointer]:
          - /url: /account/register
      - generic [ref=e15]:
        - link "My Cart (0)" [ref=e16] [cursor=pointer]:
          - /url: "#"
        - link "Check Out" [ref=e17] [cursor=pointer]:
          - /url: /cart
    - generic [ref=e20]:
      - heading "Sauce Demo" [level=1] [ref=e22]:
        - link "Sauce Demo" [ref=e23] [cursor=pointer]:
          - /url: /
          - img "Sauce Demo" [ref=e24]
      - heading "Just a demo site showing off what Sauce can do." [level=3] [ref=e27]
  - generic [ref=e28]:
    - navigation [ref=e30]:
      - list [ref=e31]:
        - listitem [ref=e32]:
          - link "Home" [ref=e33] [cursor=pointer]:
            - /url: /
        - listitem [ref=e34]:
          - link "Catalog" [ref=e35] [cursor=pointer]:
            - /url: /collections/all
        - listitem [ref=e36]:
          - link "Blog" [ref=e37] [cursor=pointer]:
            - /url: /blogs/news
        - listitem [ref=e38]:
          - link "About Us" [ref=e39] [cursor=pointer]:
            - /url: /pages/about-us
        - listitem [ref=e40]:
          - link "Wish list" [ref=e41] [cursor=pointer]:
            - /url: "#sauce-show-wish-list"
        - listitem [ref=e42]:
          - link "Refer a friend" [ref=e43] [cursor=pointer]:
            - /url: "#sauce-show-refer-friend"
      - generic [ref=e44]:
        - link [ref=e45] [cursor=pointer]:
          - /url: http://www.facebook.com/shopify
        - link [ref=e46] [cursor=pointer]:
          - /url: http://www.twitter.com/sauce_io
        - link [ref=e47] [cursor=pointer]:
          - /url: http://www.instagram.com/shopify
        - link [ref=e48] [cursor=pointer]:
          - /url: http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/
        - link [ref=e49] [cursor=pointer]:
          - /url: /blogs/news.atom
    - generic [ref=e52]:
      - link "Grey jacket Grey jacket £55.00" [ref=e54] [cursor=pointer]:
        - /url: /collections/frontpage/products/grey-jacket
        - img "Grey jacket" [ref=e55]
        - heading "Grey jacket" [level=3] [ref=e56]
        - heading "£55.00" [level=4] [ref=e57]
      - link "Noir jacket Noir jacket £60.00" [ref=e59] [cursor=pointer]:
        - /url: /collections/frontpage/products/noir-jacket
        - img "Noir jacket" [ref=e60]
        - heading "Noir jacket" [level=3] [ref=e61]
        - heading "£60.00" [level=4] [ref=e62]
      - link "Striped top Striped top £50.00" [ref=e64] [cursor=pointer]:
        - /url: /collections/frontpage/products/striped-top
        - img "Striped top" [ref=e65]
        - heading "Striped top" [level=3] [ref=e66]
        - heading "£50.00" [level=4] [ref=e67]
    - contentinfo [ref=e68]:
      - generic [ref=e69]:
        - navigation [ref=e71]:
          - heading "Footer" [level=2] [ref=e72]
          - link "Search" [ref=e73] [cursor=pointer]:
            - /url: /search
          - link "About Us" [ref=e74] [cursor=pointer]:
            - /url: /pages/about-us
        - generic [ref=e76]:
          - heading "About Us" [level=2] [ref=e77]
          - paragraph [ref=e79]:
            - strong [ref=e80]:
              - text: This is a demo site created for
              - link "Sauce" [ref=e81] [cursor=pointer]:
                - /url: http://sauceapp.io
            - text: ", an awesome new way to make your Shopify site social. Sauce allows you to let customers to share what they purchase to their friends, and see what their friends have purchased or \"wanted\" on your store."
        - generic [ref=e83]:
          - img "We accept Amex" [ref=e84]
          - img "We accept Visa" [ref=e85]
          - img "We accept Mastercard" [ref=e86]
      - generic [ref=e87]:
        - generic [ref=e89]:
          - text: Copyright © 2026 Sauce Demo.
          - link "Shopping Cart by Shopify" [ref=e90] [cursor=pointer]:
            - /url: https://www.shopify.co.uk/tour/shopping-cart?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore
          - text: .
        - navigation [ref=e92]:
          - link "Search" [ref=e93] [cursor=pointer]:
            - /url: /search
          - link "About Us" [ref=e94] [cursor=pointer]:
            - /url: /pages/about-us
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Ordenamiento de productos - SauceDemo Shopify', () => {
  4  | 
  5  |   test('Debe ordenar los productos por precio: menor a mayor', async ({ page }) => {
  6  | 
  7  |     await page.goto('https://sauce-demo.myshopify.com');
  8  | 
  9  |     // Esperar a que carguen productos
  10 |     await page.waitForLoadState('networkidle');
  11 | 
  12 |     // ====== 1. Seleccionar orden ======
  13 |     const select = page.locator('select');
  14 | 
  15 |     if (await select.count() > 0) {
  16 |       // Caso estándar <select>
  17 |       await select.selectOption({ label: /low to high/i });
  18 |     } else {
  19 |       // Caso Shopify (dropdown custom)
> 20 |       await page.click('text=Sort'); // botón del dropdown
     |                  ^ Error: page.click: Test timeout of 30000ms exceeded.
  21 |       await page.click('text=Price, low to high');
  22 |     }
  23 | 
  24 |     // Esperar a que el DOM refleje el cambio
  25 |     await page.waitForTimeout(1500);
  26 | 
  27 |     // ====== 2. Obtener precios ======
  28 |     const priceLocator = page.locator(
  29 |       '.price, .price-item, [class*="price"]'
  30 |     );
  31 | 
  32 |     const priceTexts = await priceLocator.allTextContents();
  33 | 
  34 |     // Limpieza de datos
  35 |     const prices = priceTexts
  36 |       .map(p => p.replace(/[^0-9.]/g, '').trim())
  37 |       .filter(p => p !== '')
  38 |       .map(p => parseFloat(p));
  39 | 
  40 |     // ====== 3. Validaciones ======
  41 | 
  42 |     // Validar que hay datos
  43 |     expect(prices.length).toBeGreaterThan(0);
  44 | 
  45 |     // Crear copia ordenada
  46 |     const sortedPrices = [...prices].sort((a, b) => a - b);
  47 | 
  48 |     // Validar orden correcto
  49 |     expect(prices).toEqual(sortedPrices);
  50 | 
  51 |     // Validación adicional: no está en orden inverso
  52 |     const reversed = [...prices].sort((a, b) => b - a);
  53 |     expect(prices).not.toEqual(reversed);
  54 | 
  55 |   });
  56 | 
  57 | });
```