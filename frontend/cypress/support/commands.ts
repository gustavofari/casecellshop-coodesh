declare namespace Cypress {
  interface Chainable {
    mockVitrine(): Chainable<void>;
    mockCheckoutSuccess(): Chainable<void>;
    mockCheckoutError(): Chainable<void>;
  }
}

Cypress.Commands.add('mockVitrine', () => {
  cy.intercept('GET', '**/checkout/products', { fixture: 'products.json' }).as('getProducts');
});

Cypress.Commands.add('mockCheckoutSuccess', () => {
  cy.intercept('POST', '**/checkout', {
    delay: 500,
    statusCode: 201,
    fixture: 'checkout-success.json'
  }).as('postCheckout');
});

Cypress.Commands.add('mockCheckoutError', () => {
  cy.intercept('POST', '**/checkout', {
    delay: 500,
    statusCode: 400,
    body: { message: 'Estoque insuficiente.' }
  }).as('postCheckoutError');
});
