import { test, expect } from '@playwright/test';

test.describe('CineFlix', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ─── Homepage ───────────────────────────────────────────────────────────────

  test('homepage loads', async ({ page }) => {
    await expect(page.getByText('CINEFLIX')).toBeVisible();
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  // ─── Search ─────────────────────────────────────────────────────────────────

  test('search returns results', async ({ page }) => {
    const input = page.getByPlaceholder('Rechercher...');
    await input.fill('Inception');
    await input.press('Enter');

    await page.waitForURL(/\/search\?q=/);
    await expect(page.locator('app-movie-card').first()).toBeVisible({ timeout: 10_000 });
  });

  // ─── Favorites ──────────────────────────────────────────────────────────────

  test('favorite button toggles', async ({ page }) => {
    const favBtn = page.getByRole('button', { name: /favoris/i }).first();
    await favBtn.waitFor();

    const before = await favBtn.textContent();
    await favBtn.click();
    const after = await favBtn.textContent();

    expect(before?.trim()).not.toEqual(after?.trim());
  });

});