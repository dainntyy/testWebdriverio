import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";


describe("Footer links tests", () => {
  async function verifyExternalLink(button, expectedUrlPart) {
    const originalWindow = await browser.getWindowHandle();
    await button.click();
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > 1,
      { timeout: 5000, timeoutMsg: `${expectedUrlPart} tab not opened` }
    );
    const windows = await browser.getWindowHandles();
    const newWindow = windows.find((win) => win !== originalWindow);
    await browser.switchToWindow(newWindow);
    expect(await browser.getUrl()).toContain(expectedUrlPart);
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
  }
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });
  it("should open Twitter of the company in the new tab", async () => {
    await verifyExternalLink(inventoryPage.twitterButton, "x.com");
  });
  it("should open Facebook of the company in the new tab", async () => {
    await verifyExternalLink(inventoryPage.facebookButton, "facebook.com");
  });
  it("should open Linkedin of the company in the new tab", async () => {
    await verifyExternalLink(inventoryPage.linkedinButton, "linkedin.com");
  });
});
