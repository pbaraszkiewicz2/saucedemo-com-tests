/// <reference types="Cypress" />

import loginPage from "../../support/page-object/login-page";
import users from "../../fixtures/user_types.json";

describe("Login as standard user", () => {
  before(() => {
    cy.clearCookies();
    cy.getCookies().should("be.empty");
    cy.clearLocalStorage();
    cy.getAllLocalStorage().should("be.empty");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("user should be redirected to inventory page", () => {
    loginPage.login(
      users.user_types.standard_user.username,
      users.user_types.standard_user.password
    );
    cy.url().should("include", "/inventory.html");
  });
});
