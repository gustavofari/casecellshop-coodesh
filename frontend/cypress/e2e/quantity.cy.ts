import { CheckoutPage } from "../pages/checkout.page";

describe('Seleção de quantidade na compra', () => {
  beforeEach(() => {
    cy.mockVitrine();
    CheckoutPage.actions.visit();
    cy.wait('@getProducts');
  });

  it('deve iniciar com quantidade 1 e o botão de diminuir desabilitado', () => {
    CheckoutPage.actions.getQuantityValue('ip13-silicone').should('have.text', '1');
    cy.get(CheckoutPage.selectors.productCard)
      .filter(`:has(${CheckoutPage.selectors.buyButton('ip13-silicone')})`)
      .find(CheckoutPage.selectors.decrementButton)
      .should('be.disabled');
  });

  it('deve incrementar e decrementar a quantidade', () => {
    CheckoutPage.actions.increaseQuantity('ip13-silicone', 2);
    CheckoutPage.actions.getQuantityValue('ip13-silicone').should('have.text', '3');

    CheckoutPage.actions.decreaseQuantity('ip13-silicone', 1);
    CheckoutPage.actions.getQuantityValue('ip13-silicone').should('have.text', '2');
  });

  it('não deve permitir quantidade acima do estoque disponível', () => {
    CheckoutPage.actions.increaseQuantity('ip13-silicone', 4);
    CheckoutPage.actions.getQuantityValue('ip13-silicone').should('have.text', '5');

    cy.get(CheckoutPage.selectors.productCard)
      .filter(`:has(${CheckoutPage.selectors.buyButton('ip13-silicone')})`)
      .find(CheckoutPage.selectors.incrementButton)
      .should('be.disabled');
  });

  it('deve enviar a quantidade selecionada no corpo da requisição', () => {
    cy.intercept('POST', '**/checkout', {
      statusCode: 201,
      fixture: 'checkout-success-qty.json',
    }).as('postCheckoutQty');

    CheckoutPage.actions.increaseQuantity('ip13-silicone', 2);
    CheckoutPage.actions.clickBuy('ip13-silicone');

    cy.wait('@postCheckoutQty').its('request.body').should('deep.equal', {
      productId: 'ip13-silicone',
      quantity: 3,
    });

    cy.get(CheckoutPage.selectors.modal).should('be.visible');
    cy.contains('Compra Aprovada!').should('be.visible');
  });
});
