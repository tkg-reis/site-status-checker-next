import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('email').fill(process.env.TEST_USER!);
  await page.getByLabel('password').fill(process.env.TEST_PASS!);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('/top');
  await page.context().storageState({ path: authFile });
});