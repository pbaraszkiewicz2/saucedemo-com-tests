/// <reference types="Cypress" />
import loginPage from "../support/page-object/login-page";
describe("Login page test", () => {
  before(() => {
    cy.clearCookies();
    cy.getCookies().should("be.empty");
    cy.clearLocalStorage();
    cy.getAllLocalStorage().should("be.empty");
  });

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
});
