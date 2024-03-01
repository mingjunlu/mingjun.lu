import { expect, test as it } from '@playwright/test';
import config from '../playwright.config';

const cookie = {
  path: '/',
  sameSite: 'Strict' as const,
  secure: !!config.use?.baseURL?.startsWith('https://'),
  domain: config.use?.baseURL?.split(':').at(1)?.replaceAll('/', ''),
};

it('should apply dark theme by default', async ({ page }) => {
  await page.goto('/blog');
  const darkModeButton = page.getByLabel('開啟深色模式');
  const moonIcon = page.locator('.moon-icon');
  const sunIcon = page.locator('.sun-icon');
  await expect(darkModeButton).toBeChecked();
  await expect(moonIcon).toBeVisible();
  await expect(sunIcon).not.toBeVisible();
});

it('should apply light theme if preferred', async ({ context, page }) => {
  await context.addCookies([
    {
      ...cookie,
      name: 'theme',
      value: 'light',
    },
  ]);
  await page.goto('/blog');
  const darkModeButton = page.getByLabel('開啟深色模式');
  const moonIcon = page.locator('.moon-icon');
  const sunIcon = page.locator('.sun-icon');
  await expect(darkModeButton).not.toBeChecked();
  await expect(moonIcon).not.toBeVisible();
  await expect(sunIcon).toBeVisible();
});

it('should apply dark theme if preferred', async ({ context, page }) => {
  await context.addCookies([
    {
      ...cookie,
      name: 'theme',
      value: 'dark',
    },
  ]);
  await page.goto('/blog');
  const darkModeButton = page.getByLabel('開啟深色模式');
  const moonIcon = page.locator('.moon-icon');
  const sunIcon = page.locator('.sun-icon');
  await expect(darkModeButton).toBeChecked();
  await expect(moonIcon).toBeVisible();
  await expect(sunIcon).not.toBeVisible();
});

it('should switch to light theme', async ({ context, page }) => {
  await context.addCookies([
    {
      ...cookie,
      name: 'theme',
      value: 'dark',
    },
  ]);
  await page.goto('/blog');
  const darkModeButton = page.getByLabel('開啟深色模式');
  const moonIcon = page.locator('.moon-icon');
  const sunIcon = page.locator('.sun-icon');
  await expect(darkModeButton).toBeEnabled(); // Wait for hydration
  await expect(darkModeButton).toBeChecked();
  await expect(sunIcon).not.toBeVisible();
  await expect(moonIcon).toBeVisible();
  await darkModeButton.click();
  await expect(darkModeButton).not.toBeChecked();
  await expect(sunIcon).toBeVisible();
  await expect(moonIcon).not.toBeVisible();
});

it('should switch to dark theme', async ({ context, page }) => {
  await context.addCookies([
    {
      ...cookie,
      name: 'theme',
      value: 'light',
    },
  ]);
  await page.goto('/blog');
  const darkModeButton = page.getByLabel('開啟深色模式');
  const moonIcon = page.locator('.moon-icon');
  const sunIcon = page.locator('.sun-icon');
  await expect(darkModeButton).toBeEnabled(); // Wait for hydration
  await expect(darkModeButton).not.toBeChecked();
  await expect(sunIcon).toBeVisible();
  await expect(moonIcon).not.toBeVisible();
  await darkModeButton.click();
  await expect(darkModeButton).toBeChecked();
  await expect(sunIcon).not.toBeVisible();
  await expect(moonIcon).toBeVisible();
});
