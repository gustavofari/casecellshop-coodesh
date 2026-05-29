import { CheckoutPage } from '../pages/checkout.page';

describe('Fluxo de Vitrine e Checkout', () => {
  beforeEach(() => {
    cy.mockVitrine();
    CheckoutPage.actions.visit();
    cy.wait('@getProducts');
  });

  it('deve exibir os produtos e aplicar filtro de busca', () => {
    cy.get(CheckoutPage.selectors.productCard).should('have.length', 2);

    CheckoutPage.actions.searchProduct('iPhone 14');

    cy.get(CheckoutPage.selectors.productCard).should('have.length', 1);
    cy.contains('Capinha iPhone 14').should('be.visible');
  });

  it('deve desabilitar o botão para produtos fora de estoque', () => {
    cy.get(CheckoutPage.selectors.buyButton('ip14-clear'))
      .should('be.disabled')
      .and('contain.text', 'Indisponível');
  });

  it('deve completar uma compra com sucesso e exibir o modal', () => {
    cy.mockCheckoutSuccess();

    CheckoutPage.actions.clickBuy('ip13-silicone');

    cy.get(CheckoutPage.selectors.buyButton('ip13-silicone'))
      .should('be.disabled')
      .and('contain.text', 'Processando');

    cy.wait('@postCheckout');

    cy.get(CheckoutPage.selectors.modal).should('be.visible');
    cy.contains('Compra Aprovada!').should('be.visible');

    CheckoutPage.actions.closeModal();
    cy.get(CheckoutPage.selectors.modal).should('not.exist');
  });

  it('deve exibir modal de erro quando a API falha', () => {
    cy.mockCheckoutError();

    CheckoutPage.actions.clickBuy('ip13-silicone');
    cy.wait('@postCheckoutError');

    cy.get(CheckoutPage.selectors.modal).should('be.visible');
    cy.contains('Falha na Compra').should('be.visible');
    cy.contains('Estoque insuficiente').should('be.visible');
  });
});
