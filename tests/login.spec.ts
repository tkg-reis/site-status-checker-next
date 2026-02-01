import { test, expect } from '@playwright/test';

test("ログインページへの遷移", async({page}) => {
    await page.goto("http://127.0.0.1:3000/login");

    await expect(page.locator(".p-2")).toContainText("SiteStatusChecker");
})