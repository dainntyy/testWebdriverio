
export async function verifyExternalLink(button, expectedUrlPart) {
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
