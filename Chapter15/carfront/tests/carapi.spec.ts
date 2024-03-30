import { test, expect, Page } from "@playwright/test";

/* THIS CONTROLS EXECUTION AT THE FILE LEVEL */
test.describe.configure({ mode: 'serial' });

test.describe("add new car e2e", async () => {
    const baseURL = "http://localhost:5173";
    let carShopListPage: Page;

    test.beforeAll(async ({ browser }) => {
        carShopListPage = await browser.newPage();
    });

    test.afterAll(async () => {
        await carShopListPage.close();
    });

    test("1. verify that the Car Shop data has loaded", async () => {
        await carShopListPage.goto(baseURL);
        await expect(carShopListPage.getByRole("heading", { name: "Car Shop", exact: true })).toHaveCount(1);
        await expect(carShopListPage.getByText("Loading...")).toHaveCount(0);
    });

    test("2. create a new car", async () => {
        await expect(carShopListPage).toHaveURL(baseURL);
        await expect(carShopListPage.getByText("Loading...")).toHaveCount(0);
        await expect(carShopListPage.getByRole("row", { name: "Volkswagon Beetle Yellow ABC-1231" })).toHaveCount(0);
        await expect(carShopListPage.getByLabel("Add New Car")).toHaveCount(1);
        await carShopListPage.getByLabel("Add New Car").click();
        await expect(carShopListPage.getByRole("heading", { name: "New Car", exact: true })).toHaveCount(1);
        await carShopListPage.getByRole("textbox", { name: "Brand", exact: true }).fill("Volkswagon");
        await carShopListPage.getByRole("textbox", { name: "Model", exact: true }).fill("Beetle");
        await carShopListPage.getByRole("textbox", { name: "Color", exact: true }).fill("Yellow");
        await carShopListPage.getByRole("textbox", { name: "Model Year", exact: true }).fill("2024");
        await carShopListPage.getByRole("textbox", { name: "Reg.nr", exact: true }).fill("ABC-1231");
        await carShopListPage.getByRole("textbox", { name: "Price", exact: true }).fill("45000");
        await carShopListPage.getByTestId("SaveIcon").click();
        await expect(carShopListPage.getByRole("row", { name: "Volkswagon Beetle Yellow ABC-1231" })).toHaveCount(1);
    });

    test("3. edit the new car", async () => {
        await expect(carShopListPage).toHaveURL(baseURL);
        await expect(carShopListPage.getByText("Loading...")).toHaveCount(0);
        await expect(carShopListPage.getByRole("row", { name: "Volkswagon Beetle Yellow ABC-1231" })).toHaveCount(1);
        await carShopListPage.getByRole('row', { name: "Volkswagon Beetle Yellow ABC-1231" }).getByLabel('Edit').click();
        await expect(carShopListPage.getByRole("heading", { name: "Edit Car" })).toHaveCount(1);
        await carShopListPage.getByRole("textbox", { name: "Color", exact: true }).fill("Blue");
        await carShopListPage.getByTestId("SaveIcon").click();
        await expect(carShopListPage.getByRole("row", { name: "Volkswagon Beetle Blue ABC-1231" })).toHaveCount(1);
    });

    test("4. delete new car", async () => {
        await expect(carShopListPage).toHaveURL(baseURL);
        carShopListPage.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
          });
        await carShopListPage.getByRole("row", { name: "Volkswagon Beetle Blue ABC-" }).getByLabel("Remove").click();
        await expect(carShopListPage.getByRole("row", { name: "Volkswagon Beetle Blue ABC-" })).toHaveCount(0);
    });
});