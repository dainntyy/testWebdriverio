class inventoryPage {
  get inventoryContainer() {
    return $(".inventory_container");
  }
  get burgerButton() {
    return $("#react-burger-menu-btn");
  }
  get logoutButton() {
    return $("#logout_sidebar_link");
  }
  get addToCartBtn() {
    return $('[data-test="add-to-cart-sauce-labs-backpack"]');
  }
  get firstItemName() {
    return $(".inventory_item_name");
  }
  get cartButton() {
    return $(".shopping_cart_link");
  }
  get sortDownContainer() {
    return $(".product_sort_container");
  }
  get itemNames() {
    return $$(".inventory_item_name");
  }
  get itemPrices() {
    return $$(".inventory_item_price");
  }
  get twitterButton() {
    return $('[data-test="social-twitter"');
  }

  get linkedinButton() {
    return $('[data-test="social-linkedin"');
  }
  get facebookButton() {
    return $('[data-test="social-facebook"');
  }
  async getFirstItemPrice(name) {
    const items = await $$(".inventory_item");

    for (const item of items) {
      const itemName = await item.$(".inventory_item_name").getText();
      if (itemName === name) {
        const priceText = await item.$(".inventory_item_price").getText();
        return parseFloat(priceText.replace("$", ""));
      }
    }

    throw new Error(`Item with name "${name}" not found`);
  }
  async getFirstItemName() {
    return await this.firstItemName.getText();
  }
  async getCartCount() {
    const badge = await this.cartButton;
    return badge.isExisting() ? await badge.getText() : "0";
  }

  async addFirstItemToCart() {
    await this.addToCartBtn.click();
  }

  async burgerButtonClick() {
    await this.burgerButton.click();
  }
  async logoutButtonClick() {
    await this.logoutButton.click();
  }
  async isInventoryDisplayed() {
    return await this.inventoryContainer.isDisplayed();
  }

  async sortBy(option) {
    const optionMap = {
      az: "az", // Name (A to Z)
      za: "za", // Name (Z to A)
      lohi: "lohi", // Price (low to high)
      hilo: "hilo", // Price (high to low)
    };

    const value = optionMap[option.toLowerCase()];
    if (!value) throw new Error("Unknown sort option: " + option);

    const select = await this.sortDownContainer;
    await select.selectByAttribute("value", value);

    // невелика пауза, щоб оновився DOM
    await browser.pause(1000);
  }

  async isSortedAZ() {
    const nameElements = await this.itemNames;
    const names = [];
    for (const el of nameElements) {
      names.push(await el.getText());
    }

    const cleaned = names.map((name) => name.trim());
    const sorted = [...cleaned].sort((a, b) => a.localeCompare(b));

    return cleaned.every((val, idx) => val === sorted[idx]);
  }

  async isSortedZA() {
    const nameElements = await this.itemNames;
    const names = [];
    for (const el of nameElements) {
      names.push(await el.getText());
    }

    const cleaned = names.map((name) => name.trim());
    const sorted = [...cleaned].sort((a, b) => b.localeCompare(a));

    return cleaned.every((val, idx) => val === sorted[idx]);
  }

  async isSortedLowHigh() {
    const priceElements = await this.itemPrices;
    const prices = [];
    for (const el of priceElements) {
      const text = await el.getText();
      const value = parseFloat(text.replace(/[^0-9.]/g, ""));
      prices.push(value);
    }

    const sorted = [...prices].sort((a, b) => a - b);
    return prices.every((val, idx) => Math.abs(val - sorted[idx]) < 0.01);
  }

  async isSortedHighLow() {
    const priceElements = await this.itemPrices;
    const prices = [];
    for (const el of priceElements) {
      const text = await el.getText();
      const value = parseFloat(text.replace(/[^0-9.]/g, ""));
      prices.push(value);
    }

    const sorted = [...prices].sort((a, b) => b - a);
    return prices.every((val, idx) => val === sorted[idx]);
  }
}
export default new inventoryPage();
