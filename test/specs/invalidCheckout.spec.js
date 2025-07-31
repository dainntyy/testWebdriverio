import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";
import cartPage from "../pageobjects/cart.page";

describe("Checkout without products test", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login("visual_user", "secret_sauce");
  });
  it("should not checkout without products", async () => {
    await inventoryPage.cartButton.click();
    expect((await cartPage.getCartItemNames()).length).toBe(0);
    await cartPage.proceedToCheckout();
    expect(await cartPage.isEmptyCartErrorVisible()).toBe(true);
    expect(await cartPage.getEmptyCartErrorText()).toContain("Cart is empty");
  });
});
