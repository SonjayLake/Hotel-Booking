import path from "path";
import { test, expect } from "playwright/test";

const URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);

  //click on signin button
  await page.getByRole("link", { name: "Sign-in" }).click();

  //check to see if sign-in page has been navigated to
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("abc123@gmail.com"); //find an element on the page with a name of email and populate it
  await page.locator("[name=password]").fill("abc123"); //find an element on the page with a name of password and populate it

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign-in successful")).toBeVisible();
});

test("Should show search results", async ({page}) => {
    await page.goto(URL);

    await page.getByPlaceholder("Where are you going?").fill("Dublin");

    await page.getByRole("button",{name: "Search"}).click()

    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Hotel   ")).toBeVisible();
})