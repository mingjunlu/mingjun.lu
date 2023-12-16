import { expect, test as it } from '@playwright/test';

it('should render about page', async ({ page }) => {
  await page.goto('/about');
  const heading = page.getByRole('heading');
  const githubLink = page.getByRole('link', { name: 'GitHub' });
  const emailLink = page.getByRole('link', { name: 'Email', exact: true });
  await expect(heading).toHaveText(/Hi, I'm Ming-jun Lu./);
  await expect(githubLink).toHaveAttribute('href', /github.com\/*/);
  await expect(emailLink).toHaveAttribute('href', /mailto:*/);
});
