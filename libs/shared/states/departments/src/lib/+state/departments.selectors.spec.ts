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
  const createDepartmentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DepartmentsEntity);

  let state: DepartmentsPartialState;

  beforeEach(() => {
    state = {
      departments: departmentsAdapter.setAll(
        [
          createDepartmentsEntity('PRODUCT-AAA'),
          createDepartmentsEntity('PRODUCT-BBB'),
          createDepartmentsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDepartmentsState,
          selectedId: 'PRODUCT-BBB',
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
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = DepartmentsSelectors.selectEntity(
        state
      ) as DepartmentsEntity;
      const selId = getDepartmentsId(result);

      expect(selId).toBe('PRODUCT-BBB');
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
