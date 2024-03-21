/// <reference types="Cypress" />

import loginPage from "../support/page-object/login-page";
import users from "../fixtures/user_types.json";
import inventoryPage from "../support/page-object/inventory-page";

describe("Inventory page test", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.login(
      users.user_types.standard_user.username,
      users.user_types.standard_user.password
    );
  });
  it("should open inventory page after successful login", () => {
    cy.url().should("include", "/inventory.html");
  });

  it("has visible all page elements", () => {
    inventoryPage.inventoryPageElementsVerification();
  });

  it.only("has 6 inventory items - each has all required elements", () => {
    for (
      let inventoryItemNumber = 0;
      inventoryItemNumber < 6;
      inventoryItemNumber++
    ) {
      inventoryPage.inventoryItemVerification(inventoryItemNumber);
    }
  });
});
