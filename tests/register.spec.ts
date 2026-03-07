import { test, expect, Dialog } from '@playwright/test';

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

test('登録ページのログインページ遷移ボタンの確認', async({page}) => {
    await page.goto('/register');
    page.getByRole("button", { name : "Login" }).click();
    await expect(page).toHaveURL('/login');
})

// 登録操作テスト

test('登録フォームの送信ができ、アラートが出る', async ({ page }) => {
    const username = "";
    const email = `test_${Date.now()}@example.com`;
    const password = 'Test123456!';

    await page.goto('/register');

    await page.getByLabel('username').fill(username);
    await page.getByLabel('email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    const dialogPromise = new Promise<Dialog>((resolve) => {
        page.once('dialog', (dialog) => resolve(dialog));
    });

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
});

// テストメール登録が必要になる

test('登録フォームの送信ができ、成功のアラートが出る', async ({ page }) => {
    const username = process.env.TEST_USERNAME!;
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    await page.goto('/register');

    await page.getByLabel('username').fill(username);
    await page.getByLabel('email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    const dialogPromise = new Promise<Dialog>((resolve) => {
        page.once('dialog', (dialog) => resolve(dialog));
    });

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain("register successful");
});

test('ユーザー名の形式が不正なら、バリデーションエラーを出力する', async ({ page }) => {
    const blankUsername = "";
    const email = `test_${Date.now()}@example.com`;
    const password = 'Test123456!';

    await page.goto('/register');

    await page.getByLabel('username').fill(blankUsername);
    await page.getByLabel('email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    const paragragh = page.getByText("ユーザー名は3文字以上10文字以下にしてください.。");

    await expect(paragragh).toBeVisible();
});

test('メールアドレスの形式が不正なら、バリデーションエラーを出力する', async ({ page }) => {
    const username = "test";
    const email = `test_${Date.now()}`;
    const password = 'Test123456!';

    await page.goto('/register');

    await page.getByLabel('username').fill(username);
    await page.getByLabel('email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    const paragragh = page.getByText("メールアドレスが無効です。");

    await expect(paragragh).toBeVisible();
});

test('パスワードの形式が不正なら、バリデーションエラーを出力する', async ({ page }) => {
    const username = "test";
    const email = `test_${Date.now()}@example.com`;
    const password = 'Test123';

    await page.goto('/register');

    await page.getByLabel('username').fill(username);
    await page.getByLabel('email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    const paragragh = page.getByText("パスワードは8文字以上20文字以下にしてください");

    await expect(paragragh).toBeVisible();
});