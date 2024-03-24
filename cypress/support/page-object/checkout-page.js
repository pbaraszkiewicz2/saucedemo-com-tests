/// <reference types="Cypress" />

import inventoryPage from "../../support/page-object/inventory-page";
import cartPage from "../../support/page-object/cart-page";

class checkoutPage {
  elements = {
    firstNameInput: () => cy.get('input[data-test="firstName"]'),
    lastNameInput: () => cy.get('input[data-test="lastName"]'),
    postalCodeInput: () => cy.get('input[data-test="postalCode"]'),
    continueButton: () => cy.get('input[data-test="continue"]'),
    errorContainer: () => cy.get("div.error-message-container"),
    cancelButton: () => cy.get('button[data-test="cancel"]'),
  };
  enterFirstName(firstName) {
    this.elements.firstNameInput().clear();
    this.elements.firstNameInput().type(firstName);
  }

  enterLastName(lastName) {
    this.elements.lastNameInput().clear();
    this.elements.lastNameInput().type(lastName);
  }

  enterPostalCode(postalCode) {
    this.elements.postalCodeInput().clear();
    this.elements.postalCodeInput().type(postalCode);
  }

  proceedToCheckoutSummaryPageWithOneItem() {
    inventoryPage.addItemToCart(0);
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    this.enterFirstName("John");
    this.enterLastName("Test");
    this.enterPostalCode("11111");
    this.elements.continueButton().click();
    cy.url().should("include", "/checkout-step-two.html");
  }
}

export default new checkoutPage();
