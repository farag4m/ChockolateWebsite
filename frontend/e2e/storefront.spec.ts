import { test, expect } from '@playwright/test'

test.describe('Storefront navigation', () => {
  test('homepage renders hero and shop link', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Crafted for the/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible()
  })

  test('navbar shows Choçkolate logo', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Choçkolate/i }).first()).toBeVisible()
  })

  test('shop page renders product cards', async ({ page }) => {
    await page.goto('/shop')
    await expect(page.getByRole('heading', { name: /Our Collection/i })).toBeVisible()
    await expect(page.getByText('Dark Ecuador 72%').first()).toBeVisible()
    await expect(page.getByText('Milk Madagascar 45%').first()).toBeVisible()
  })

  test('product detail page renders add-to-cart', async ({ page }) => {
    await page.goto('/products/dark-ecuador-72')
    await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible()
  })

  test('cart count increments when adding from product listing', async ({ page }) => {
    await page.goto('/shop')
    // Initial cart count badge should not be visible (0 items)
    const badge = page.locator('nav').getByText(/^\d+$/)
    await expect(badge).not.toBeVisible()

    // Add first product to cart
    await page.getByRole('button', { name: /Add to Cart/i }).first().click()

    // Badge should now show 1
    await expect(page.locator('nav').getByText('1')).toBeVisible()
  })
})
