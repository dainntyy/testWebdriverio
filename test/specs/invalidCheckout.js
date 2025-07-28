import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";

describe("Checkout without products test", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login("visual_user", "secret_sauce");
    const visible = await inventoryPage.isInventoryDisplayed();
    expect(visible).toBe(true);
  });
  it("should not checkout without products", async () => {
    await inventoryPage.cartButton.click();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems.length).toBe(0);
    await cartPage.proceedToCheckout();
    const isErrorVisible = await cartPage.isEmptyCartErrorVisible();
    expect(isErrorVisible).toBe(true);
    const errorText = await cartPage.getEmptyCartErrorText();
    expect(errorText).toContain("Cart is empty");
  });
});
