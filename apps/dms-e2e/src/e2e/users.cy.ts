import {
  getConfirmButton,
  getCreateUserButton,
  getDepartmentEmailInput,
  getDepartmentNameInput,
  getUserDeleteButton, getUserEditButton,
  getUsersListRows,
  selectDepartment
} from '../support/app.po';


describe('users', () => {
  beforeEach(() => cy.visit('/'));

    it('should display users when department is selected', () => {
      getUsersListRows()
        .should('have.length', 2);

      selectDepartment(1);

      getUsersListRows()
        .should('have.length', 3);
    })

    it('should create user', () => {
      const user = {
        name: 'Cypress',
        email: 'cypress@test.com'
      }
      selectDepartment(1);

      getCreateUserButton()
        .click();

      getDepartmentNameInput()
        .type(user.name);
      getDepartmentEmailInput()
        .type(user.email);

      getConfirmButton()
        .click()
        .wait(1000);

      getUsersListRows()
        .should('have.length', 4)
        .contains(user.email)
        .should('exist');
    })

    it('should edit user', () => {
      const user = {
        name: 'Cypress',
        email: 'cypress@test.com'
      }
      selectDepartment(1);

      getUserEditButton()
        .click();

      getDepartmentNameInput()
        .clear()
        .type(user.name);
      getDepartmentEmailInput()
        .clear()
        .type(user.email);

      getConfirmButton()
        .click()
        .wait(1000);

      getUsersListRows()
        .should('have.length', 3)
        .contains(user.email)
        .should('exist');
    })

    it('should delete user', () => {
      selectDepartment(1);

      getUsersListRows()
        .should('have.length', 3)

      getUserDeleteButton()
        .click();

      getUsersListRows()
        .should('have.length', 2);
    })
});
