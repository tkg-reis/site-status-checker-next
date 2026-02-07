import { test, expect } from '@playwright/test';

test(' / は未認証の場合 /top 経由で /login に着地してタイトル確認', async ({ page }) => {
  await page.goto('/'); // baseURLがある前提
  const title = await page.title();
  expect(title).toBe("site status checker");
});

test('セッションが保持されている場合、ログイン画面を通過してログインに成功する', async() => { 
  // playwright/.authの活用
  
})

test('ヘッダー文言リンク確認',async({page}) => {
  // リンクがないこと
  // 文言の確認

})

test('email欄の動作文言確認', async({page}) => {
  await page.goto('/');
  const label = page.getByLabel('email');
  const input = page.getByLabel('email');
  const paragragh = page.getByText("you input email adress.")
  await expect(label).toBeVisible();
  await expect(input).toHaveAttribute('name', 'email');
  await expect(input).toHaveAttribute('placeholder', 'example@gmail.com');
  await expect(paragragh).toBeVisible();
})

test('password欄の動作文言確認', async({page}) => {
  await page.goto('/');
  const label = page.getByLabel('email');
  const input = page.getByLabel('email');
  const paragragh = page.getByText("you input email adress.")
  await expect(label).toBeVisible();
  await expect(input).toHaveAttribute('name', 'email');
  await expect(input).toHaveAttribute('placeholder', 'example@gmail.com');
  await expect(paragragh).toBeVisible();
})

test('メールアドレスとパスワードを使用してログインする', async() => { 
  // playwright/.authの活用
  
})

test('ログインに成功した場合成功の旨のalertが表示される', async() => { 
  // playwright/.authの活用
  
})

test('ログインに失敗した場合失敗の旨のalertが表示される', async() => { 
  // playwright/.authの活用
  
})

test('間違ったメールアドレスとパスワードを使用してログインに失敗する', async() => { 
  // playwright/.authの活用
  // 通常はスキップできる

})

test('メールアドレスと間違ったパスワードを使用してログインに失敗する', async() => { 
  // playwright/.authの活用
  // 通常はスキップできる

})

test('間違ったメールアドレスと間違ったパスワードを使用してログインに失敗する', async() => { 
  // playwright/.authの活用
  // 通常はスキップできる

})

test('間違ったメールアドレスと間違ったパスワードを使用してログインに失敗する', async() => { 
  // playwright/.authの活用
  // 通常はスキップできる

})

test('ログインに失敗した際のバリエーション文言の確認', async() => { 
  // playwright/.authの活用
  // 通常はスキップできる

})

test('ログインボタンの文言確認', async({page}) => {
  await page.goto('/');
  const button = page.getByRole("button", { name : "Login" })
  await expect(button).toBeVisible();
})

test('登録ボタンの文言確認', async({page}) => {
  await page.goto('/');
  const button = page.getByRole("button", { name : "Register" })
  await expect(button).toBeVisible();
})
