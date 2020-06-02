/// <reference types="cypress" />
context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.injectAxe();
  });

  describe('Loads page', () => {
    it('has heading', () => {
      cy.get('h1').should('have.text', 'Hello world');
      cy.checkA11y('#content > h1', null, cy.terminalLog);
    });
  });
});
