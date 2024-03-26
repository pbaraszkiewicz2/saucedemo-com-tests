/// <reference types="Cypress" />

import loginPage from "../support/page-object/login-page";
import inventoryPage from "../support/page-object/inventory-page";
import users from "../fixtures/user_types.json";
import dropdownOptions from "../fixtures/sort_dropdown_options.json";

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

  it("has all required page elements", () => {
    inventoryPage.inventoryPageElementsVerification();
  });

  it("should open sidebar menu visible when burger menu pressed", () => {
    inventoryPage.elements.burgerMenu().click();
    inventoryPage.elements.sidebarMenu().should("be.visible");
  });

  it("sidebar - all items button test", () => {
    inventoryPage.elements.burgerMenu().click();
    inventoryPage.sidebarElements.allItems().invoke("attr", "href");
    inventoryPage.sidebarElements.allItems().click();
    cy.url().should("include", "/inventory.html");
  });

  it("sidebar - about button test", () => {
    inventoryPage.elements.burgerMenu().click();
    inventoryPage.sidebarElements
      .about()
      .should("have.attr", "href", "https://saucelabs.com/");
  });

  it("sidebar - logout test", () => {
    inventoryPage.elements.burgerMenu().click();
    inventoryPage.sidebarElements.logout().click();
    cy.url().should("include", "https://www.saucedemo.com/");
  });

  it("sidebar - reset app state test", () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.numberOfItemsInCartVerification(1);
    inventoryPage.elements.burgerMenu().click();
    inventoryPage.sidebarElements.resetAppState().click();
    inventoryPage.elements.shoppingCartBadge().should("not.exist");
  });

  it("should hide sidebar menu when x button is pressed", () => {
    inventoryPage.elements.burgerMenu().click();
    inventoryPage.elements.sidebarMenuCloseButton().click();
    inventoryPage.elements.sidebarMenu().should("not.be.visible");
  });

  it("footer should include links", () => {
    inventoryPage.elements.footerCopy().should("have.attr", "href");
  });

  it("has 6 inventory items - each has all required elements", () => {
    for (
      let inventoryItemNumber = 0;
      inventoryItemNumber < 6;
      inventoryItemNumber++
    ) {
      inventoryPage.inventoryItemVerification(inventoryItemNumber);
    }
  });

  it("inventory items can be sorted by titles", () => {
    inventoryPage.elements.productSortDropdown().select(dropdownOptions.az);
    inventoryPage.elements.productSortDropdown().select(dropdownOptions.za);
  });

  it("inventory items can be sorted by prices (asc and desc)", () => {
    inventoryPage.elements
      .productSortDropdown()
      .select(dropdownOptions.price_low_to_high);
    inventoryPage.elements
      .productSortDropdown()
      .select(dropdownOptions.price_high_lo_low);
  });

  it("add one item to the cart", () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.numberOfItemsInCartVerification(1);
  });

  it("remove one item from the cart", () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.removeItemFromCart(0);
    inventoryPage.elements.shoppingCartBadge().should("not.exist");
  });

  it("add 6 items to the cart ", () => {
    for (
      let inventoryItemNumber = 0;
      inventoryItemNumber < 6;
      inventoryItemNumber++
    ) {
      inventoryPage.addItemToCart(inventoryItemNumber);
    }
    inventoryPage.numberOfItemsInCartVerification(6);
  });
});
