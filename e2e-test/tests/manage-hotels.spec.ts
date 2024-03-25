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

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${URL}/add-hotel`); //navigate to the add-hotel page

  await page.locator(`[name="name"]`).fill("Test Hotel");
  await page.locator(`[name="city"]`).fill("Test City");
  await page.locator(`[name="country"]`).fill("Test Country");
  await page
    .locator(`[name="description"]`)
    .fill("Lorem Ipsum Dolor for a test hotel");
  await page.locator(`[name="pricePerNight"]`).fill("100");
  await page.selectOption(`select[name="starRating"]`, "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Parking").check();
  await page.getByLabel("Spa").check();

  await page.locator(`[name="adultCount"]`).fill("2");
  await page.locator(`[name="childCount"]`).fill("4");

  await page.setInputFiles(`[name="imageFiles"]`, [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 20000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${URL}/my-hotels`);

  await expect(page.getByText("Dublin Getaways").first()).toBeVisible();

  await expect(
    page.getByText("Ut feugiat nibh vel sodales suscipit").first()
  ).toBeVisible();

  await expect(page.getByText("Dublin, Ireland").first()).toBeVisible();
  await expect(page.getByText("$119 per night").first()).toBeVisible();
  await expect(page.getByText("2 adults, 3 children").first()).toBeVisible();
  await expect(page.getByText("All Inclusive").first()).toBeVisible();
  await expect(page.getByText("2 stars").first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Add Hotel" }).first()
  ).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${URL}/my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });

  await page.locator('[name="name"]').fill("");
  await page.locator('[name="name"]').fill("Hotel Updated");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 20000 });

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue("Hotel Updated");
});
