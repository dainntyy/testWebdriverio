import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import assert from "assert";

describe("Login tests", () => {
  it("should login with valid credentials", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    expect(await inventoryPage.isInventoryDisplayed()).toBe(true);
  });
  it("should not login with invalid password", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "wrong_password");
    const error = await loginPage.getErrorMessage();
    assert.ok(
      error.includes("Epic sadface"),
      "Expected error message not found"
    );
    expect(await loginPage.isInputInvalid("username")).toBe(true);
    expect(await loginPage.isInputInvalid("password")).toBe(true);
  });
  it("should not login with invalid user name", async () => {
    await loginPage.open();
    await loginPage.login("wrong_user", "secret_sauce");
    const error = await loginPage.getErrorMessage();
    assert.ok(
      error.includes("Epic sadface"),
      "Expected error message not found"
    );
    expect(await loginPage.isInputInvalid("username")).toBe(true);
    expect(await loginPage.isInputInvalid("password")).toBe(true);
  });
});
