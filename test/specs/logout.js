import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";

describe("Logout test", () => {
  it("should logout the user succesfully", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.burgerButtonClick();
    const menuItems = await inventoryPage.getMenuItems();
    expect(menuItems.length).toBe(4);
    await inventoryPage.logoutButtonClick();
    expect(await loginPage.getLoginContainer()).toBe(true);
    expect(await loginPage.getUsernameValue()).toBe("");
    expect(await loginPage.getPasswordValue()).toBe("");
  });
});
