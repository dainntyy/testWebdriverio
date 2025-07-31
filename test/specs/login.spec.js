import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import { checkInvalidInput } from "../helpers/auth.helper";

describe("Login tests", () => {
  it("should login with valid credentials", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    expect(await inventoryPage.isInventoryDisplayed()).toBe(true);
  });
  it("should not login with invalid password", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "wrong_password");
    await checkInvalidInput();
  });
  it("should not login with invalid user name", async () => {
    await loginPage.open();
    await loginPage.login("wrong_user", "secret_sauce");
    await checkInvalidInput();
  });
});
