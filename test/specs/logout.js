import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";

describe("Logout test", () => {
  it("should logout the user succesfully", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.burgerButtonClick();
    await inventoryPage.logoutButtonClick();
    expect(await loginPage.getLoginContainer()).toBe(true);
  });
});
