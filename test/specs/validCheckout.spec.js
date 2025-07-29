import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";

describe("Valid checkout test", () => {
  const productName = "Sauce Labs Backpack";
  before(async () => {
    await loginPage.open();
    await loginPage.login("visual_user", "secret_sauce");
  });
  it("should add product to cart", async () => {
    await inventoryPage.addFirstItemToCart();
    expect(await inventoryPage.getCartCount()).toBe("1");
  });
  it("should display correct product in cart", async () => {
    await inventoryPage.cartButton.click();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems[0].toLowerCase()).toContain(productName.toLowerCase());
  });
  it("should checkout successfully with valid credentials", async () => {
    await cartPage.proceedToCheckout();
    expect(await checkoutPage.isCheckoutFormDisplayed()).toBe(true);
    await checkoutPage.fillCredentials();
    await checkoutPage.continueButton.click();
    expect(await cartPage.isCartItemPresent()).toBe(true);
    const overviewItems = await checkoutPage.getProductNames();
    expect(overviewItems[0].toLowerCase()).toContain(productName.toLowerCase());
    await checkoutPage.finishButton.click();
    expect(await checkoutPage.isCompleteMessageDisplayed()).toBe(true);
  });
  it("should return to inventory and have empty cart", async () => {
    await checkoutPage.homeButton.click();
    expect(await inventoryPage.isInventoryDisplayed()).toBe(true);
    expect(await inventoryPage.getCartCount()).toBe("");
  });
});
