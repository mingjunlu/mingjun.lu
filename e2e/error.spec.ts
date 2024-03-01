import { expect, test as it } from '@playwright/test';
import { randomUUID } from 'node:crypto';

it('should render 404 page', async ({ page }) => {
  await page.goto(`/${randomUUID()}`);
  const image = page.getByRole('figure', { name: 'Page Not Found' });
  await expect(image).toBeVisible();
});
