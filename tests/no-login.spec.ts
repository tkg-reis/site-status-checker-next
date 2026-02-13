import { test, expect, Dialog } from '@playwright/test';

test(' / は未認証の場合 /top 経由で /login に着地してタイトル確認', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();

    expect(title).toBe("site status checker");
});

test('ヘッダー文言リンク確認',async({page}) => {
    await page.goto('/login');

    const span = page.locator("span");
    const listItem = page.getByRole("listitem");

    await expect(span).toHaveText("SiteStatusChecker");
    await expect(listItem).not.toHaveText(["insert","user","Logout"]);
})

test('email欄の動作文言確認', async({page}) => {
    await page.goto('/login');

    const label = page.getByLabel('email');
    const input = page.getByLabel('email');
    const paragragh = page.getByText("you input email adress.");

    await expect(label).toBeVisible();
    await expect(input).toHaveAttribute('name', 'email');
    await expect(input).toHaveAttribute('placeholder', 'example@gmail.com');
    await expect(paragragh).toBeVisible();
})

test('password欄の動作文言確認', async({page}) => {
    await page.goto('/login');

    const label = page.getByLabel('password');
    const input = page.getByLabel('password');
    const paragragh = page.getByText("you input password.");

    await expect(label).toBeVisible();
    await expect(input).toHaveAttribute('name', 'password');
    await expect(paragragh).toBeVisible();
})

test('ログインに成功した場合成功の旨のalertが表示される', async({page}) => { 
    await page.goto('/login');

    await page.getByLabel('email').fill(process.env.TEST_USER!);
    await page.getByLabel('password').fill(process.env.TEST_PASS!);

    const dialogPromise = new Promise<Dialog>((resolve) => {
        page.once('dialog', (dialog) => resolve(dialog));
    });

    await page.getByRole('button', { name: 'Login' }).click();

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('login successful'); 
})

test('間違ったメールアドレスと間違ったパスワードを使用してログインに失敗した場合、失敗したの旨のalertが表示される', async({page}) => { 
    await page.goto('/login');

    await page.getByLabel('email').fill("failed-email@gmail.com");
    await page.getByLabel('password').fill("failed-password");

    const dialogPromise = new Promise<Dialog>((resolve) => {
        page.once('dialog', (dialog) => resolve(dialog));
    });

    await page.getByRole('button', { name: 'Login' }).click();

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
})

test('間違ったメールアドレスと正しいパスワードを使用してログインに失敗する', async({page}) => {
    await page.goto('/login');

    await page.getByLabel('email').fill("failed-email@gmail.com");
    await page.getByLabel('password').fill(process.env.TEST_PASS!);

    const dialogPromise = new Promise<Dialog>((resolve) => {
        page.once('dialog', (dialog) => resolve(dialog));
    });

    await page.getByRole('button', { name: 'Login' }).click();

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
})

test('正しいメールアドレスと間違ったパスワードを使用してログインに失敗する', async({page}) => {
    await page.goto('/login');

    await page.getByLabel('email').fill(process.env.TEST_USER!);
    await page.getByLabel('Password').fill("failed-password");

    const dialogPromise = new Promise<Dialog>((resolve) => {
        page.once('dialog', (dialog) => resolve(dialog));
    });

    await page.getByRole('button', { name: 'Login' }).click();

    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
})

test('ログインボタンの文言確認', async({page}) => {
    await page.goto('/login');
    const button = page.getByRole("button", { name : "Login" })
    await expect(button).toBeVisible();
})

test('登録ボタンの文言確認', async({page}) => {
    await page.goto('/login');

    const button = page.getByRole("button", { name : "Register" });
    const paragragh = page.getByText("Do you have an account?");

    await expect(button).toBeVisible();
    await expect(paragragh).toBeVisible();
})