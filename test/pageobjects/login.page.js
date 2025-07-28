import { $ } from "@wdio/globals";

class LoginPage {
  get inputUsername() {
    return $("#user-name");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnSubmit() {
    return $("#login-button");
  }
  get errorContainer() {
    return $(".error-message-container");
  }
  get loginContainer() {
    return $('[data-test="login-container"]');
  }
  async getLoginContainer() {
    return await this.loginContainer.isDisplayed();
  }
  async getErrorMessage() {
    return await this.errorContainer.getText();
  }
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
  async isInputInvalid(field) {
    const selector = field === "username" ? "#user-name" : "#password";
    const input = $(selector);

    // Отримуємо клас безпосередньо з input або його обгортки
    const classAttr = await input.getAttribute("class");
    return classAttr.includes("input_error");
  }

  async open() {
    await browser.url("https://www.saucedemo.com");
  }
}

export default new LoginPage();
