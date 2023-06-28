import {
  getConfirmButton,
  getCreateDepartmentButton,
  getDepartmentDeleteButton,
  getDepartmentEditButton,
  getDepartmentNameInput,
  getDepartmentsListRows,
} from '../support/app.po';

describe('departments', () => {
  beforeEach(() => cy.visit('/'));

  it('should display departments', () => {
    getDepartmentsListRows()
      .should('have.length', 3);
  })

  it('should create department', () => {
    const testDepartmentName = 'Cypress test department';
    getCreateDepartmentButton()
      .click();
    getDepartmentNameInput()
      .type('Cypress test department')
    getConfirmButton()
      .click()

    getDepartmentsListRows()
      .should('have.length', 4)
      .contains(testDepartmentName)
      .should('exist');
  })

  it('should edit department', () => {
    const testDepartmentName = 'Cypress test department';

    getDepartmentEditButton()
      .click()

    getDepartmentNameInput()
      .clear()
      .type('Cypress test department')
    getConfirmButton()
      .click()
      .wait(1000);

    getDepartmentsListRows()
      .should('have.length', 3)
      .contains(testDepartmentName)
      .should('exist');
  })

  it('should delete department', () => {
    getDepartmentsListRows()
      .should('have.length', 3)

    getDepartmentDeleteButton()
      .click()
      .wait(1000);

    getDepartmentsListRows()
      .should('have.length', 2);
  })
});
