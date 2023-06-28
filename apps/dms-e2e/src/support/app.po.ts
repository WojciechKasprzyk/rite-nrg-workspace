export const getHeaders = () => cy.get('h2');

const getDepartmentsList = () => cy.get('nrg-departments');
export const getDepartmentsListRows = () => getDepartmentsList()
  .find('tr')

const getUsersList = () => cy.get('nrg-users');
export const getUsersListRows = () => getUsersList()
  .find('tr')


const getButtons = () => cy.get('button');
export const getCreateDepartmentButton = () => getButtons().contains('Create department');
export const getCreateUserButton = () => getButtons().contains('Create user');

export const getDepartmentNameInput = () => cy.get('#name');
export const getDepartmentEmailInput = () => cy.get('#email');
export const getDepartmentDepartmentIdDropdown = () => cy.get('#departmentId');
export const getConfirmButton = () => cy.get('button').contains('Confirm');

export const getDepartmentEditButton = () => cy.get(':nth-child(2) > :nth-child(3) > p-button');
export const getDepartmentDeleteButton = () => cy.get(':nth-child(2) > :nth-child(4) > p-button');

export const getUserEditButton = () => cy.get('#pr_id_4-table > .p-datatable-tbody > :nth-child(1) > :nth-child(4) > p-button');
export const getUserDeleteButton = () => cy.get(':nth-child(1) > :nth-child(5) > p-button');

export const selectDepartment = (id: number) => getDepartmentsListRows()
  .contains(id.toString())
  .click();
