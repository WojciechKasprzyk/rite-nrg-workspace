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
