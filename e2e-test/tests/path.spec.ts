import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173/";

test("should allow user sign-in", async ({ page }) => {
  //navigate to homepage
  await page.goto(URL);

  //click on signin button
  await page.getByRole("link", { name: "Sign-in" }).click();

  //check to see if sign-in page has been navigated to
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("abc123@gmail.com"); //find an element on the page with a name of email and populate it
  await page.locator("[name=password]").fill("abc123"); //find an element on the page with a name of password and populate it

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign-in successful")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  //use randomly generated email for robust tests
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`;

  //navigate to homepage
  await page.goto(URL);

  //click sign-in button
  await page.getByRole("link", { name: "Sign-in" }).click();

  //click the registration link
  await page.getByRole("link", { name: "Create an account here" }).click();

  //check to see if on registration page
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  //fill in the form
  await page.locator("[name=firstName]").fill("e2e_first");
  await page.locator("[name=lastName]").fill("e2e_first");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("e2e123");
  await page.locator("[name=confirmPassword]").fill("e2e123");

  //click create account
  await page.getByRole("button", { name: "Create Account" }).click();

  //check to see if register successful
  await expect(page.getByText("Registration Successful")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
