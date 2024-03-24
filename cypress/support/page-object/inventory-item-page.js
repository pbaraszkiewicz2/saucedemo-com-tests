/// <reference types="Cypress" />

import inventoryPage from "./inventory-page";

class inventoryItemPage {
  elements = {
    backToProductsButton: () => cy.get('button[data-test="back-to-products"]'),
    shoppingCart: () => cy.get("a.shopping_cart_link"),
    shoppingCartBadge: () => cy.get("span.shopping_cart_badge"),
    itemContainer: () => cy.get("div.inventory_details_desc_container"),
    itemImg: () => cy.get("img.inventory_details_img"),
    itemName: () => cy.get("div.inventory_details_name"),
    itemDesc: () => cy.get("div.inventory_details_desc"),
    itemPrice: () => cy.get("div.inventory_details_price"),
    addToCartButton: () => cy.get("button.btn_inventory"),
  };

  inventoryItemPageElementsVerification() {
    this.elements.backToProductsButton().should("be.visible");
    this.elements.shoppingCart().should("be.visible");
    this.elements.itemContainer().should("be.visible");
    this.elements.itemImg().should("be.visible");
    this.elements.itemName().should("be.visible");
    this.elements.itemDesc().should("be.visible");
    this.elements.itemPrice().should("be.visible");
    this.elements.addToCartButton().should("be.visible");
  }

  enterInventoryItemPageByName() {
    inventoryPage.inventoryItemElements
      .inventoryItem()
      .eq(0)
      .within(() => {
        inventoryPage.inventoryItemElements.itemName().click();
      });
    cy.url().should("include", "/inventory-item.html?id=");
  }
}

export default new inventoryItemPage();
