/// <reference types="Cypress" />

class inventoryPage {
  elements = {
    logo: () => cy.get("div.app_logo"),
    burgerMenu: () => cy.get("button#react-burger-menu-btn"),
    shoppingCart: () => cy.get("a.shopping_cart_link"),
    shoppingCartBadge: () => cy.get('div[id="shopping_cart_container"] span'),
    pageTitle: () => cy.get("span.title"),
    productSortDropdown: () =>
      cy.get('select[data-test="product_sort_container"]'),
    productContainer: () => cy.get("div.inventory_list"),
    xLink: () => cy.get('a[href="https://twitter.com/saucelabs"]'),
    facebookLink: () => cy.get('a[href="https://www.facebook.com/saucelabs"]'),
    linkedInLink: () =>
      cy.get('a[href="https://www.linkedin.com/company/sauce-labs/"]'),
    footer: () => cy.get("div.footer_copy"),
    sidebarMenu: () => cy.get("div.bm-menu"),
    sidebarMenuCloseButton: () => cy.get("button#react-burger-cross-btn"),
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

  inventoryItemElements = {
    inventoryItem: () => cy.get("div.inventory_item"),
    itemName: () => cy.get("div.inventory_item_name"),
    itemImg: () => cy.get("img.inventory_item_img"),
    itemDesc: () => cy.get("div.inventory_item_desc"),
    itemPrice: () => cy.get("div.inventory_item_price"),
    addToCartButton: () => cy.get("button"),
  };

  inventoryItemVerification(inventoryNumber) {
    this.inventoryItemElements
      .inventoryItem()
      .eq(inventoryNumber)
      .should("be.visible")
      .within(() => {
        this.inventoryItemElements.itemName().should("be.visible");
        this.inventoryItemElements.itemImg().should("be.visible");
        this.inventoryItemElements.itemDesc().should("be.visible");
        this.inventoryItemElements.itemPrice().should("be.visible");
        this.inventoryItemElements.addToCartButton().should("be.visible");
      });
  }

  addItemToCart(inventoryNumber) {
    this.inventoryItemElements
      .inventoryItem()
      .eq(inventoryNumber)
      .within(() => {
        this.inventoryItemElements.addToCartButton().click();
        this.inventoryItemElements
          .addToCartButton()
          .should("have.text", "Remove");
      });
  }

  removeItemFromCart(inventoryNumber) {
    this.inventoryItemElements
      .inventoryItem()
      .eq(inventoryNumber)
      .within(() => {
        this.inventoryItemElements.addToCartButton().click();
        this.inventoryItemElements
          .addToCartButton()
          .should("have.text", "Add to cart");
      });
  }

  numberOfItemsInCartVerification(numberOfItems) {
    this.elements
      .shoppingCartBadge()
      .should("be.visible")
      .should("have.text", numberOfItems);
  }
}

export default new inventoryPage();
