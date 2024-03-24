/// <reference types="Cypress" />
import loginPage from "../support/page-object/login-page";
import inventoryPage from "../support/page-object/inventory-page";
import users from "../fixtures/user_types.json";
import cartPage from "../support/page-object/cart-page";

describe("Cart page test", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.login(
      users.user_types.standard_user.username,
      users.user_types.standard_user.password
    );
  });

  it("should open cart page when cart button is pressed", () => {
    inventoryPage.elements.shoppingCart().click();
    cy.url().should("include", "/cart.html");
  });

  it("items added from inventory page are visible on cart page", () => {
    inventoryPage.addItemToCart(2);
    inventoryPage.addItemToCart(5);
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.cartItem().should("have.length", 2);
  });

  it("return to inventory page and add two more items", () => {
    inventoryPage.addItemToCart(2);
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.continueShoppingButton().click();
    inventoryPage.addItemToCart(3);
    inventoryPage.addItemToCart(4);
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.cartItem().should("have.length", 3);
  });

  it("can access inventory item page from the cart", () => {
    inventoryPage.addItemToCart(2);
    inventoryPage.elements.shoppingCart().click();
    cartPage.elements.itemName().click();
    cy.url().should("include", "/inventory-item.html?id=");
  });
});
