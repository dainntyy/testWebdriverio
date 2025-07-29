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
    expect((await inventoryPage.getMenuItems()).length).toBe(4);
    await inventoryPage.logoutButtonClick();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.cartButton.click();
    const cartItemName = await cartPage.getFirstCartItemName();
    expect(cartItemName).toBe(productName);
  });
});
