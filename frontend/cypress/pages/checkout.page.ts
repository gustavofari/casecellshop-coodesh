export const CheckoutPage = {
  selectors: {
    searchInput: '[data-testid="search-input"]',
    productCard: '[data-testid="product-card"]',
    buyButton: (productId: string) => `[data-testid="buy-button-${productId}"]`,
    modal: '[data-testid="purchase-modal"]',
    modalCloseBtn: '[data-testid="close-modal-btn"]',
    quantitySelector: '[data-testid="quantity-selector"]',
    quantityValue: '[data-testid="quantity-value"]',
    incrementButton: '[aria-label="Aumentar quantidade"]',
    decrementButton: '[aria-label="Diminuir quantidade"]',
  },

  actions: {
    visit: () => {
      cy.visit("/");
    },

    searchProduct: (term: string) => {
      cy.get(CheckoutPage.selectors.searchInput).clear().type(term);
    },

    clickBuy: (productId: string) => {
      cy.get(CheckoutPage.selectors.buyButton(productId)).click();
    },

    closeModal: () => {
      cy.get(CheckoutPage.selectors.modalCloseBtn).click();
    },

    increaseQuantity: (productId: string, times = 1) => {
      for (let i = 0; i < times; i += 1) {
        cy.get(CheckoutPage.selectors.productCard)
          .filter(`:has(${CheckoutPage.selectors.buyButton(productId)})`)
          .find(CheckoutPage.selectors.incrementButton)
          .click();
      }
    },

    decreaseQuantity: (productId: string, times = 1) => {
      for (let i = 0; i < times; i += 1) {
        cy.get(CheckoutPage.selectors.productCard)
          .filter(`:has(${CheckoutPage.selectors.buyButton(productId)})`)
          .find(CheckoutPage.selectors.decrementButton)
          .click();
      }
    },

    getQuantityValue: (productId: string) =>
      cy
        .get(CheckoutPage.selectors.productCard)
        .filter(`:has(${CheckoutPage.selectors.buyButton(productId)})`)
        .find(CheckoutPage.selectors.quantityValue),
  },
};
