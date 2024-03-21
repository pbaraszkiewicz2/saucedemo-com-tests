/// <reference types="Cypress" />
import loginPage from "../support/page-object/login-page";

describe("Login page test", () => {
  beforeEach(() => {
    // cy.clearCookies();
    // cy.getCookies().should("be.empty");
    // cy.clearLocalStorage();
    // cy.getAllLocalStorage().should("be.empty");
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

  it("should show error msg if username is not provided during login", () => {
    loginPage.elements.loginButton().click();
    loginPage.errorContainerVerification("Epic sadface: Username is required");
  });

  it("should show error msg if password is not provided during login", () => {
    loginPage.enterUsername("test");
    loginPage.elements.loginButton().click();
    loginPage.errorContainerVerification("Epic sadface: Password is required");
  });

  it("should show error msg if provided login data do not match any user in the service", () => {
    loginPage.login("test", "test");
    loginPage.errorContainerVerification(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  // it("should close error container if close button is clicked", () => {
  //   loginPage.login("test", "test");
  //   loginPage.elements.errorContainerCloseButton().click();
  //   loginPage.elements.errorContainer().should("not.exist");
  // });
});
