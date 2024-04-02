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

test("Should show search results", async ({ page }) => {
  await page.goto(URL);

  await page.getByPlaceholder("Where are you going?").fill("Dublin");

  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
  await expect(page.getByText("Dublin Hotel")).toBeVisible();
});

test("Should show hotel detial", async ({ page }) => {
  await page.goto(URL);

  //search for hotel and click on it
  await page.getByPlaceholder("Where are you going?").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Hotel Updated").click();

  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(URL);

  //search for hotel and click on it
  await page.getByPlaceholder("Where are you going?").fill("Dublin");

  const date = new Date();

  date.setDate(date.getDate() + 4);

  const formattedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Hotel Updated").click();

  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: $357.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("12/50");
  await stripeFrame.locator('[placeholder="CVC"]').fill("333");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("10453");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page.getByText("Booking Saved!")).toBeVisible();

  //check to see if hotel was added to my bookings page
  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Hotel Updated")).toBeVisible();
});
