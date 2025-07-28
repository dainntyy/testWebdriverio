import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import cartPage from "../pageobjects/cart.page";

describe("Cart tests", () => {
  it("should save the cart state after logout", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    const productName = await inventoryPage.getFirstItemName();
    await inventoryPage.addFirstItemToCart();
    expect(await inventoryPage.getCartCount()).toBe("1");
    await inventoryPage.burgerButtonClick();
    const menuItems = await inventoryPage.getMenuItems();
    expect(menuItems.length).toBe(4);
    await inventoryPage.logoutButtonClick();
    expect(await loginPage.inputUsername.getValue()).toBe("");
    expect(await loginPage.inputPassword.getValue()).toBe("");
    await loginPage.login("standard_user", "secret_sauce");
    expect(await inventoryPage.getCartCount()).toBe("1");
    await inventoryPage.cartButton.click();
    expect(await cartPage.isCartItemPresent()).toBe(true);
    const cartItemName = await cartPage.getFirstCartItemName();
    expect(cartItemName === productName);
  });
});
