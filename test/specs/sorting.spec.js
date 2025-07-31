import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";

describe("Sortings tests", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });
  it("should sort the items A-Z", async () => {
    await inventoryPage.sortBy("az");
    expect(await inventoryPage.isSortedCorrectly("az")).toBe(true);
  });
  it("should sort the items Z-A", async () => {
    await inventoryPage.sortBy("za");
    expect(await inventoryPage.isSortedCorrectly("za")).toBe(true);
  });
  it("should sort the items by price (low to high)", async () => {
    await inventoryPage.sortBy("lohi");
    expect(await inventoryPage.isSortedCorrectly("lohi")).toBe(true);
  });
  it("should sort the items by price (high to low)", async () => {
    await inventoryPage.sortBy("hilo");
    expect(await inventoryPage.isSortedCorrectly("hilo")).toBe(true);
  });
});
