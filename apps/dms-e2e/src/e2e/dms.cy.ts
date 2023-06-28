import {
  getHeaders
} from '../support/app.po';

const headerTexts = [
  'Departments',
  'Users within department'
]

describe('dms', () => {
  beforeEach(() => cy.visit('/'));

  it('should display headers', () => {
    getHeaders()
      .should('have.length', 2)
      .each((h2, i) => {
        expect(h2.text()).to.eq(headerTexts[i]);
      })
  });
});
