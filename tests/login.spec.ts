import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test(' / は未認証の場合 /top に着地してタイトル確認（セッションを利用してログインに成功する）', async ({ page }) => {
  await page.goto('/');

  const title = await page.title();

  expect(title).toBe("site status checker");
  await expect(page).toHaveURL(/\/top$/);
});

test('ヘッダー文言リンク確認',async({page}) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'SiteStatusChecker' });
  const listItem = page.getByRole("listitem");
  
  await expect(link).toHaveAttribute('href', '/');
  await expect(listItem).toHaveText(["insert","user","Logout"]);
})