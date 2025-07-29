import { $, $$ } from "@wdio/globals";
class checkoutPage {
  get checkoutForm() {
    return $(".checkout_info");
  }
  get firstName() {
    return $('[data-test="firstName"]');
  }
  get lastName() {
    return $('[data-test="lastName"]');
  }
  get postalCode() {
    return $('[data-test="postalCode"]');
  }
  get continueButton() {
    return $('[data-test="continue"]');
  }
  get itemPrice() {
    return $(".summary_subtotal_label");
  }
  get finishButton() {
    return $('[data-test="finish"]');
  }
  get finishMessage() {
    return $('[data-test="checkout-complete-container"]');
  }
  get homeButton() {
    return $('[data-test="back-to-products"]');
  }
  async fillCredentials() {
    await this.firstName.setValue("John");
    await this.lastName.setValue("Smith");
    await this.postalCode.setValue("40000");
  }

  async getProductNames() {
    const items = await $$(".inventory_item_name");
    if (items.length > 1) {
      return Promise.all(items.map((el) => el.getText().toLowerCase()));
    } else {
      const name = await items[0].getText();
      return [name.toLowerCase()];
    }
  }

  async isCheckoutFormDisplayed() {
    return await this.checkoutForm.isDisplayed();
  }
  async isCompleteMessageDisplayed() {
    return await this.finishMessage.isDisplayed();
  }
}
export default new checkoutPage();
