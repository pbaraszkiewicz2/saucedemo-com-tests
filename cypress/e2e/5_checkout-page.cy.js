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

  it("should not open checkout page if there is no any item in the cart", () => {
    inventoryPage.elements.shoppingCartBadge().should("not.exist");
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    cy.url().should("include", "/cart.html");
  });

  it("should open checkout page when checkout button is pressed on cart page", () => {
    // Condition mentioned in previous test case is not fulfilled here - changed to proceed with other test cases
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("should not proceed further with checkout if not all personal info is provided", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
  });

  it("has all required page elements", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
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

  it("first name input should not allow numbers", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    checkoutPage.enterFirstName(1);
    checkoutPage.elements.firstNameInput().should("have.value", "");
  });

  it("last name input should not allow numbers", () => {
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.checkoutButton().click();
    checkoutPage.enterLastName(1);
    checkoutPage.elements.lastNameInput().should("have.value", "");
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

  it("checkout summary page has all required information", () => {
    checkoutPage.proceedToCheckoutSummaryPageWithOneItem();
    checkoutPage.checkoutPageSummaryVerification();
  });

  it("should be able to finish checkout", () => {
    checkoutPage.proceedToCheckoutSummaryPageWithOneItem();
    checkoutPage.elements.finishButton().click();
    cy.url().should("include", "/checkout-complete.html");
  });

  it("should be able to continue shopping when checkout is finished", () => {
    checkoutPage.proceedToCheckoutSummaryPageWithOneItem();
    checkoutPage.elements.finishButton().click();
    checkoutPage.elements.backToProductsButton().click();
    cy.url().should("include", "/inventory.html");
    inventoryPage.elements.shoppingCartBadge().should("not.exist");
  });
});
