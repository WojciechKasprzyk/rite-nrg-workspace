import { createAction, props } from '@ngrx/store';
import { DepartmentsEntity } from './departments.models';

export const initDepartments = createAction('[Departments Page] Init');

export const loadDepartmentsSuccess = createAction(
  '[Departments/API] Load Departments Success',
  props<{ departments: DepartmentsEntity[] }>()
);

export const loadDepartmentsFailure = createAction(
  '[Departments/API] Load Departments Failure',
  props<{ error: any }>()
);

export const selectDepartment = createAction(
  '[Departments Page] Select Department',
  props<{ id: number | undefined }>()
)


export const deleteDepartment = createAction(
  '[Departments/API] Delete Department',
  props<{ id: number }>()
);

export const deleteDepartmentSuccess = createAction(
  '[Departments/API] Delete Department Success'
);

export const deleteDepartmentFailure = createAction(
  '[Departments/API] Delete Department Failure',
  props<{ error: any }>()
);

export const createDepartment = createAction(
  '[Departments/API] Create Department',
  props<{ name: string }>()
);

export const createDepartmentSuccess = createAction(
  '[Departments/API] Create Department Success'
);

export const createDepartmentFailure = createAction(
  '[Departments/API] Create Department Failure',
  props<{ error: any }>()
);

export const editDepartment = createAction(
  '[Departments/API] Edit Department',
  props<{ name: string, id: number }>()
);

export const editDepartmentSuccess = createAction(
  '[Departments/API] Edit Department Success'
);

export const editDepartmentFailure = createAction(
  '[Departments/API] Edit Department Failure',
  props<{ error: any }>()
);
