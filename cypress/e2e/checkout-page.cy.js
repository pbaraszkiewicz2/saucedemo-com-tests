/// <reference types="Cypress" />

import loginPage from "../support/page-object/login-page";
import inventoryPage from "../support/page-object/inventory-page";
import users from "../fixtures/user_types.json";
import cartPage from "../support/page-object/cart-page";
import checkoutPage from "../support/page-object/checkout-page";

describe("Checkout page test", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.login(
      users.user_types.standard_user.username,
      users.user_types.standard_user.password
    );
  });

  it("should open checkout page when checkout button is pressed on cart page", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("should not proceed further with checkout if not all personal info is provided", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();

    checkoutPage.elements.continueButton().click();
    checkoutPage.elements.errorContainer().should("be.visible");
    cy.url().should("include", "/checkout-step-one.html");

    checkoutPage.enterFirstName("John");
    checkoutPage.elements.continueButton().click();
    checkoutPage.elements.errorContainer().should("be.visible");
    cy.url().should("include", "/checkout-step-one.html");

    checkoutPage.enterLastName("Test");
    checkoutPage.elements.continueButton().click();
    checkoutPage.elements.errorContainer().should("be.visible");
    cy.url().should("include", "/checkout-step-one.html");

    checkoutPage.elements.lastNameInput().clear();
    checkoutPage.enterPostalCode("11111");
    checkoutPage.elements.continueButton().click();
    checkoutPage.elements.errorContainer().should("be.visible");
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("return to the cart page when cancel button is pressed", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    checkoutPage.elements.cancelButton().click();
    cy.url().should("include", "/cart.html");
  });

  it("add one item to the cart and navigate to the checkout summary page", () => {
    checkoutPage.proceedToCheckoutSummaryPageWithOneItem();
  });

  it("verify info about items selected to but on checkout summary page", () => {
    checkoutPage.proceedToCheckoutSummaryPageWithOneItem();
    // TODO: sprawdz cene, opis itd - tutaj mockowanie odpowiedzi z serwera
  });
});
