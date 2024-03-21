/// <reference types="Cypress" />

class inventoryPage {
  elements = {
    logo: () => cy.get("div.app_logo"),
    burgerMenu: () => cy.get("button#react-burger-menu-btn"),
    shoppingCart: () => cy.get("a.shopping_cart_link"),
    pageTitle: () => cy.get("span.title"),
    productSortDropdown: () =>
      cy.get('select[data-test="product_sort_container"]'),
    productContainer: () => cy.get("div.inventory_list"),
    xLink: () => cy.get('a[href="https://twitter.com/saucelabs"]'),
    facebookLink: () => cy.get('a[href="https://www.facebook.com/saucelabs"]'),
    linkedInLink: () =>
      cy.get('a[href="https://www.linkedin.com/company/sauce-labs/"]'),
    footer: () => cy.get("div.footer_copy"),
  };

  inventoryPageElementsVerification() {
    this.elements.logo().should("be.visible");
    this.elements.burgerMenu().should("be.visible");
    this.elements.shoppingCart().should("be.visible");
    this.elements.pageTitle().should("be.visible");
    this.elements.productSortDropdown().should("be.visible");
    this.elements.productContainer().should("be.visible");
    this.elements.xLink().should("be.visible");
    this.elements.facebookLink().should("be.visible");
    this.elements.linkedInLink().should("be.visible");
    this.elements.footer().should("be.visible");
  }

  inventoryItemVerification(inventoryNumber) {
    cy.get("div.inventory_item")
      .eq(inventoryNumber)
      .should("be.visible")
      .within(() => {
        cy.get("div.inventory_item_name").should("be.visible");
        cy.get("img.inventory_item_img").should("be.visible");
        cy.get("div.inventory_item_desc").should("be.visible");
        cy.get("div.inventory_item_price").should("be.visible");
        cy.get("button").should("be.visible");
      });
  }
}

export default new inventoryPage();
