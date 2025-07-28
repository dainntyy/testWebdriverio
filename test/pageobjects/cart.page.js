class cartPage {
  get cartItems() {
    return $$(".cart_item"); // повертає масив елементів у кошику
  }
  get checkoutButton() {
    return $('[data-test="checkout"]');
  }

  get firstCartItemName() {
    return $(".inventory_item_name");
  }
  get firstCartItemPrice() {
    return $(".inventory_item_price");
  }

  async isCartItemPresent() {
    const items = await this.cartItems;

    return items.length > 0;
  }
  async getFirstCartItemName() {
    return await this.firstCartItemName.getText();
  }
  async getFirstCartItemPrice() {
    return await this.firstCartItemPrice.getText();
  }

  async getCartItemNames() {
    const items = await $$(".inventory_item_name");
    if (items.length > 1) {
      return Promise.all(items.map((el) => el.getText().toLowerCase()));
    } else if (items.length === 0) {
      return [];
    } else {
      const name = await items[0].getText();
      return [name.toLowerCase()];
    }
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async isEmptyCartErrorVisible() {
    const error = await $(".cart_error");
    return error.isDisplayed();
  }

  async getEmptyCartErrorText() {
    const error = await $(".cart_error");
    return error.getText();
  }
}

export default new cartPage();
