/// <reference types="Cypress" />

import loginPage from "../support/page-object/login-page";

describe("Login page test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open login page", () => {});

  it("has visible logo", () => {
    loginPage.elements.logo().should("be.visible");
  });

  it("has visible username input with correct placeholder", () => {
    loginPage.elements
      .usernameInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Username");
  });

  it("has visible password input with correct placeholder", () => {
    loginPage.elements
      .passwordInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Password");
  });

  it("has visible login button with correct label", () => {
    loginPage.elements
      .loginButton()
      .should("be.visible")
      .should("have.attr", "value", "Login");
  });

  it("error msg should include sad face emoticon", () => {
    loginPage.elements.loginButton().click();
    loginPage.errorContainerVerification(":-(");
  });

  it("should show error msg if username is not provided during login", () => {
    loginPage.elements.loginButton().click();
    loginPage.errorContainerVerification("Username is required");
  });

  it("should show error msg if password is not provided during login", () => {
    loginPage.enterUsername("test");
    loginPage.elements.loginButton().click();
    loginPage.errorContainerVerification("Password is required");
  });

  it("should show error msg if provided login data do not match any user in the service", () => {
    loginPage.login("test", "test");
    loginPage.errorContainerVerification(
      "Username and password do not match any user in this service"
    );
  });
});
