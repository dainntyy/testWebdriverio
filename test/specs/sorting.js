import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import { expect } from "@wdio/globals";

describe("Sortings tests", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    const visible = await inventoryPage.isInventoryDisplayed();
    expect(visible).toBe(true);
  });
  it("should sort the items A-Z", async () => {
    await inventoryPage.sortBy("az");
    const sortedAZ = await inventoryPage.isSortedAZ();
    console.log(`Result of the 1 test: ${sortedAZ}`);
    expect(sortedAZ).toBe(true);
  });
  it("should sort the items Z-A", async () => {
    await inventoryPage.sortBy("za");
    const sortedZA = await inventoryPage.isSortedZA();
    console.log(`Result of the 2 test: ${sortedZA}`);
    expect(sortedZA).toBe(true);
  });
  it("should sort the items by price (low to high)", async () => {
    await inventoryPage.sortBy("lohi");
    const sortedlohi = await inventoryPage.isSortedLowHigh();
    console.log(`Result of the 3 test: ${sortedlohi}`);
    expect(sortedlohi).toBe(true);
  });
  it("should sort the items by price (high to low)", async () => {
    await inventoryPage.sortBy("hilo");
    const sortedhilo = await inventoryPage.isSortedHighLow();
    console.log(`Result of the 4 test: ${sortedhilo}`);
    expect(sortedhilo).toBe(true);
  });
});
