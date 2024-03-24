import loginPage from "../support/page-object/login-page";
import inventoryPage from "../support/page-object/inventory-page";
import users from "../fixtures/user_types.json";
import inventoryItemPage from "../support/page-object/inventory-item-page";

describe("Inventory item page test", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.login(
      users.user_types.standard_user.username,
      users.user_types.standard_user.password
    );
  });

  it("should open inventory item page when its name is pressed", () => {
    inventoryItemPage.enterInventoryItemPageByName();
  });

  it("should open inventory item page when its img is pressed", () => {
    inventoryPage.inventoryItemElements
      .inventoryItem()
      .eq(0)
      .within(() => {
        inventoryPage.inventoryItemElements.itemImg().click();
      });
    cy.url().should("include", "/inventory-item.html?id=");
  });

  it("has visible all page elements", () => {
    inventoryItemPage.enterInventoryItemPageByName();
    inventoryItemPage.inventoryItemPageElementsVerification();
  });

  it("add item to cart", () => {
    inventoryItemPage.enterInventoryItemPageByName();
    inventoryItemPage.elements.addToCartButton().click();
    inventoryItemPage.elements
      .shoppingCartBadge()
      .should("be.visible")
      .should("have.text", 1);
    inventoryItemPage.elements.addToCartButton().should("have.text", "Remove");
  });

  it("remove item from cart", () => {
    inventoryItemPage.enterInventoryItemPageByName();
    inventoryItemPage.elements.addToCartButton().click();
    inventoryItemPage.elements.addToCartButton().click();
    inventoryItemPage.elements.shoppingCartBadge().should("not.exist");
    inventoryItemPage.elements
      .addToCartButton()
      .should("have.text", "Add to cart");
  });

  it("return to the inventory page when back to products is pressed", () => {
    inventoryItemPage.enterInventoryItemPageByName();
    inventoryItemPage.elements.backToProductsButton().click();
    cy.url().should("include", "/inventory.html");
  });
});
