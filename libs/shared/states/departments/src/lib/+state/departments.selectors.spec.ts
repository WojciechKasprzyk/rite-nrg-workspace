import { DepartmentsEntity } from './departments.models';
import {
  departmentsAdapter,
  DepartmentsPartialState,
  initialDepartmentsState,
} from './departments.reducer';
import * as DepartmentsSelectors from './departments.selectors';

describe('Departments Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDepartmentsId = (it: DepartmentsEntity) => it.id;
  const createDepartmentsEntity = (id: number, name = '', users = []) =>
    ({
      id,
      name: name || `name-${id}`,
      users
    } as DepartmentsEntity);

  let state: DepartmentsPartialState;

  beforeEach(() => {
    state = {
      departments: departmentsAdapter.setAll(
        [
          createDepartmentsEntity(1, 'PRODUCT-AAA'),
          createDepartmentsEntity(2, 'PRODUCT-BBB'),
          createDepartmentsEntity(3, 'PRODUCT-CCC'),
        ],
        {
          ...initialDepartmentsState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Departments Selectors', () => {
    it('selectAllDepartments() should return the list of Departments', () => {
      const results = DepartmentsSelectors.selectAllDepartments(state);
      const selId = getDepartmentsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = DepartmentsSelectors.selectEntity(
        state
      ) as DepartmentsEntity;
      const selId = getDepartmentsId(result);

      expect(selId).toBe(2);
    });

    it('selectDepartmentsLoaded() should return the current "loaded" status', () => {
      const result = DepartmentsSelectors.selectDepartmentsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectDepartmentsError() should return the current "error" state', () => {
      const result = DepartmentsSelectors.selectDepartmentsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
