import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";

describe("Valid checkout test", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login("visual_user", "secret_sauce");
    const visible = await inventoryPage.isInventoryDisplayed();
    expect(visible).toBe(true);
  });
  it("should checkout successfully with valid credentials", async () => {
    const productName = "Sauce Labs Backpack";
    await inventoryPage.addFirstItemToCart();
    const expectedTotal = await inventoryPage.getFirstItemPrice(productName);
    expect(await inventoryPage.getCartCount()).toBe("1");
    await inventoryPage.cartButton.click();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toEqual([productName.toLowerCase()]);
    await cartPage.proceedToCheckout();
    expect(await checkoutPage.isCheckoutFormDisplayed()).toBe(true);
    await checkoutPage.fillCredentials();
    await checkoutPage.continueButton.click();
    expect(await cartPage.isCartItemPresent()).toBe(true);
    const overviewItems = await checkoutPage.getProductNames();
    expect(overviewItems).toEqual([productName.toLowerCase()]);
    const displayedTotal = await checkoutPage.getItemPrice();
    // expect(displayedTotal).toBe(expectedTotal);
    await checkoutPage.finishButton.click();
    expect(await checkoutPage.isCompleteMessageDisplayed()).toBe(true);
    await checkoutPage.homeButton.click();
    expect(await inventoryPage.isInventoryDisplayed()).toBe(true);
    const cartFinal = await inventoryPage.getCartCount();
    expect(cartFinal).toBe("");
  });
});
