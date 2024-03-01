import { expect, test as it } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

it('should render blog posts', async ({ page }) => {
  const fileNames = await fs.readdir(
    path.resolve(path.join(process.cwd(), '/src/content/posts')),
  );
  const postLinks = fileNames.map(
    (fileName) => `/blog/${fileName.replace(/\.md$/, '')}`,
  );
  await page.goto('/blog');
  for (const postLink of postLinks) {
    const link = page.locator(`[href*="${postLink}"]`, {
      hasNotText: '閱讀全文',
    });
    await expect(link).toHaveAttribute('href', postLink);
  }
});
