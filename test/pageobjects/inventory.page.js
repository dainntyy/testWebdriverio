import { $, $$, browser } from "@wdio/globals";
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
  get menuItems() {
    return $$(".bm-item.menu-item");
  }

  async getMenuItems() {
    return await this.menuItems;
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
    const validOptions = ["az", "za", "lohi", "hilo"];
    const value = option.toLowerCase();
    if (!validOptions.includes(value)) {
      throw new Error(`Unknown sort option: ${option}`);
    }

    await this.sortDownContainer.selectByAttribute("value", value);
    await browser.pause(500);
  }

  async isSortedCorrectly(type) {
    const isNameSort = type === "az" || type === "za";
    const isPriceSort = type === "lohi" || type === "hilo";

    if (isNameSort) {
      const names = await Promise.all(this.itemNames.map((el) => el.getText()));
      const cleaned = names.map((name) => name.trim());
      const sorted = [...cleaned].sort((a, b) => a.localeCompare(b));
      if (type === "za") sorted.reverse();
      return cleaned.every((val, idx) => val === sorted[idx]);
    }

    if (isPriceSort) {
      const prices = await Promise.all(
        this.itemPrices.map(async (el) => {
          const text = await el.getText();
          return parseFloat(text.replace(/[^0-9.]/g, ""));
        })
      );
      const sorted = [...prices].sort((a, b) => a - b);
      if (type === "hilo") sorted.reverse();
      return prices.every((val, idx) => Math.abs(val - sorted[idx]) < 0.01);
    }

    throw new Error(`Unknown sort type: ${type}`);
  }
}
export default new inventoryPage();
