import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";

describe("Footer links tests", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    const visible = await inventoryPage.isInventoryDisplayed();
    expect(visible).toBe(true);
  });
  it("should open Twitter of the company in the new tab", async () => {
    const originalWindow = await browser.getWindowHandle();
    await inventoryPage.twitterButton.click();
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > 1,
      { timeout: 5000, timeoutMsg: "X tab not opened" }
    );
    const windows = await browser.getWindowHandles();
    const newWindow = windows.find((win) => win !== originalWindow);
    await browser.switchToWindow(newWindow);

    const url = await browser.getUrl();
    expect(url).toContain("x.com");

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
  });
  it("should open Facebook of the company in the new tab", async () => {
    const originalWindow = await browser.getWindowHandle();
    await inventoryPage.facebookButton.click();
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > 1,
      { timeout: 5000, timeoutMsg: "Facebook tab not opened" }
    );
    const windows = await browser.getWindowHandles();
    const newWindow = windows.find((win) => win !== originalWindow);
    await browser.switchToWindow(newWindow);

    const url = await browser.getUrl();
    expect(url).toContain("facebook.com");

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
  });
  it("should open Linkedin of the company in the new tab", async () => {
    const originalWindow = await browser.getWindowHandle();
    await inventoryPage.linkedinButton.click();
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > 1,
      { timeout: 5000, timeoutMsg: "Linkedin tab not opened" }
    );
    const windows = await browser.getWindowHandles();
    const newWindow = windows.find((win) => win !== originalWindow);
    await browser.switchToWindow(newWindow);

    const url = await browser.getUrl();
    expect(url).toContain("linkedin.com");

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
  });
});
