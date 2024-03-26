/// <reference types="Cypress" />

class cartPage {
  elements = {
    cartItem: () => cy.get("div.cart_item"),
    continueShoppingButton: () =>
      cy.get('button[data-test="continue-shopping"]'),
    checkoutButton: () => cy.get('button[data-test="checkout"]'),
    itemName: () => cy.get("div.inventory_item_name"),
    quantity: () => cy.get("div.cart_quantity"),
    cartItem: () => cy.get("div.cart_item"),
    removeFromCartButton: () => cy.get("button"),
  };
}

export default new cartPage();
