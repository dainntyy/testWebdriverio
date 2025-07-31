import loginPage from "../pageobjects/login.page";
import assert from "assert";

export async function checkInvalidInput() {
  const error = await loginPage.getErrorMessage();
  assert.ok(error.includes("Epic sadface"), "Expected error message not found");

  const usernameInvalid = await loginPage.isInputInvalid("username");
  const passwordInvalid = await loginPage.isInputInvalid("password");

  expect(usernameInvalid && passwordInvalid).toBe(true);
}
