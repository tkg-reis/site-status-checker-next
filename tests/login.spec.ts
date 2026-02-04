import { test, expect } from '@playwright/test';

test(' / は未認証の場合 /top 経由で /login に着地してタイトルをテストする', async ({ page }) => {
  await page.goto('/'); // baseURLがある前提
  const title = await page.title();
  expect(title).toBe("site status checker");
});
