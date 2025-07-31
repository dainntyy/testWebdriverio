import inventoryPage from "../pageobjects/inventory.page";
import loginPage from "../pageobjects/login.page";
import { verifyExternalLink } from "../helpers/navigation.helper";

describe("Footer links tests", () => {
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
