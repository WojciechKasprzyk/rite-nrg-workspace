import { Action } from '@ngrx/store';

import * as DepartmentsActions from './departments.actions';
import { DepartmentsEntity } from './departments.models';
import {
  DepartmentsState,
  initialDepartmentsState,
  departmentsReducer,
} from './departments.reducer';

describe('Departments Reducer', () => {
  const createDepartmentsEntity = (
    id: string,
    name = ''
  ): DepartmentsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Departments actions', () => {
    it('loadDepartmentsSuccess should return the list of known Departments', () => {
      const departments = [
        createDepartmentsEntity('PRODUCT-AAA'),
        createDepartmentsEntity('PRODUCT-zzz'),
      ];
      const action = DepartmentsActions.loadDepartmentsSuccess({ departments });

      const result: DepartmentsState = departmentsReducer(
        initialDepartmentsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = departmentsReducer(initialDepartmentsState, action);

      expect(result).toBe(initialDepartmentsState);
    });
  });
});
