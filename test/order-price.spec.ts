import { test, expect } from '@playwright/test';

test.describe('Ordenamiento de productos - SauceDemo Shopify', () => {

  test('Debe ordenar los productos por precio: menor a mayor', async ({ page }) => {

    await page.goto('https://sauce-demo.myshopify.com');

    // Esperar a que carguen productos
    await page.waitForLoadState('networkidle');

    // ====== 1. Seleccionar orden ======
    const select = page.locator('select');

    if (await select.count() > 0) {
      // Caso estándar <select>
      await select.selectOption({ label: /low to high/i });
    } else {
      // Caso Shopify (dropdown custom)
      await page.click('text=Sort'); // botón del dropdown
      await page.click('text=Price, low to high');
    }

    // Esperar a que el DOM refleje el cambio
    await page.waitForTimeout(1500);

    // ====== 2. Obtener precios ======
    const priceLocator = page.locator(
      '.price, .price-item, [class*="price"]'
    );

    const priceTexts = await priceLocator.allTextContents();

    // Limpieza de datos
    const prices = priceTexts
      .map(p => p.replace(/[^0-9.]/g, '').trim())
      .filter(p => p !== '')
      .map(p => parseFloat(p));

    // ====== 3. Validaciones ======

    // Validar que hay datos
    expect(prices.length).toBeGreaterThan(0);

    // Crear copia ordenada
    const sortedPrices = [...prices].sort((a, b) => a - b);

    // Validar orden correcto
    expect(prices).toEqual(sortedPrices);

    // Validación adicional: no está en orden inverso
    const reversed = [...prices].sort((a, b) => b - a);
    expect(prices).not.toEqual(reversed);

  });

});