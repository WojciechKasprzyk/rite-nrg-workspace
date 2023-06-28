import { getGreeting } from '../support/app.po';

const headerTexts = [
  'Departments',
  'Users within department'
]

describe('dms', () => {
  beforeEach(() => cy.visit('/'));

  it('should display headers', () => {
    cy.get('body')
      .find('h2')
      .should('have.length', 2)
      .each((h2, i) => {
        expect(h2.text()).to.eq(headerTexts[i]);
      })
  });

  it('should display departments', () => {
    cy.get('nrg-departments')
      .find('tr')
      .should('have.length', 3);

    cy.get('nrg-users')
      .find('tr')
      .should('have.length', 2);

    cy.get('nrg-departments')
      .find('tr')
      .contains('1')
      .click();

    cy.get('nrg-users')
      .find('tr')
      .should('have.length', 3);
  })
});
