import { expect, test as it } from '@playwright/test';

it('should redirect to /blog', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/blog');
});
