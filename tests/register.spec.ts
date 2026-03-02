import { test, expect } from '@playwright/test';

test('登録ページのタイトル確認', async ({ page }) => {
    await page.goto('/register');

    const title = await page.title();

    expect(title).toBe("site status checker");
});

test('登録ページのヘッダー文言リンク確認',async({page}) => {
    await page.goto('/register');

    const span = page.locator("span");
    const listItem = page.getByRole("listitem");

    await expect(span).toHaveText("SiteStatusChecker");
    await expect(listItem).not.toHaveText(["insert","user","Logout"]);
})

test('登録ページのusername欄の動作文言確認', async({page}) => {
    await page.goto('/register');

    const label = page.getByLabel('username');
    const input = page.getByLabel('username');
    const paragragh = page.getByText("you input username.");

    await expect(label).toBeVisible();
    await expect(input).toHaveAttribute('name', 'username');
    await expect(paragragh).toBeVisible();
})

test('登録ページのemail欄の動作文言確認', async({page}) => {
    await page.goto('/register');

    const label = page.getByLabel('email');
    const input = page.getByLabel('email');
    const paragragh = page.getByText("you input email adress.");

    await expect(label).toBeVisible();
    await expect(input).toHaveAttribute('name', 'email');
    await expect(input).toHaveAttribute('placeholder', 'example@gmail.com');
    await expect(paragragh).toBeVisible();
})

test('登録ページのpassword欄の動作文言確認', async({page}) => {
    await page.goto('/register');

    const label = page.getByLabel('password');
    const input = page.getByLabel('password');
    const paragragh = page.getByText("you input password.");

    await expect(label).toBeVisible();
    await expect(input).toHaveAttribute('name', 'password');
    await expect(paragragh).toBeVisible();
})

test('登録ページの登録ボタンの文言確認', async({page}) => {
    await page.goto('/register');

    const button = page.getByRole("button", { name : "Register" });
    await expect(button).toBeVisible();
})

test('登録ページのログインページ遷移ボタンの文言確認', async({page}) => {
    await page.goto('/register');
    const button = page.getByRole("button", { name : "Login" })
    const paragragh = page.getByText("Already you have an account?");
    await expect(paragragh).toBeVisible();
    await expect(button).toBeVisible();
})

// 登録操作テスト