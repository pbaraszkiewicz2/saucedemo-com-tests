/// <reference types="Cypress" />

class loginPage {
  elements = {
    logo: () => cy.get(".login_logo"),
    usernameInput: () => cy.get('input[data-test="username"]'),
    passwordInput: () => cy.get('input[data-test="password"]'),
    loginButton: () => cy.get('input[data-test="login-button"]'),
    errorContainer: () => cy.get("div.error-message-container"),
    errorMsg: () => cy.get('h3[data-test="error"]'),
    errorContainerCloseButton: () => cy.get("button.error-button"),
  };

  enterUsername(username) {
    this.elements.usernameInput().clear();
    this.elements.usernameInput().type(username);
  }

  enterPassword(password) {
    this.elements.passwordInput().clear();
    this.elements.passwordInput().type(password);
  }

  clickLoginButton() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  errorContainerVerification(msg) {
    this.elements
      .errorContainer()
      .should("have.css", "background-color", "rgb(226, 35, 26)");
    this.elements.errorMsg().should("include.text", msg);
  }
}

export default new loginPage();
