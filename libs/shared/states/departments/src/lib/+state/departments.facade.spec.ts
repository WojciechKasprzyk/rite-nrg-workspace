import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as DepartmentsActions from './departments.actions';
import { DepartmentsEffects } from './departments.effects';
import { DepartmentsFacade } from './departments.facade';
import { DepartmentsEntity } from './departments.models';
import {
  DEPARTMENTS_FEATURE_KEY,
  DepartmentsState,
  initialDepartmentsState,
  departmentsReducer,
} from './departments.reducer';
import * as DepartmentsSelectors from './departments.selectors';
import { MockProvider } from "ng-mocks";
import { DepartmentsService } from "@rite-nrg-workspace/shared/api";
import { of } from "rxjs";

interface TestSchema {
  departments: DepartmentsState;
}

describe('DepartmentsFacade', () => {
  let facade: DepartmentsFacade;
  let store: Store<TestSchema>;
  const createDepartmentsEntity = (
    id = 1,
    name = '',
    users= [1,2,3]
  ): DepartmentsEntity => ({
    id,
    name: name || `name-${id}`,
    users
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DEPARTMENTS_FEATURE_KEY, departmentsReducer),
          EffectsModule.forFeature([DepartmentsEffects]),
        ],
        providers: [
          DepartmentsFacade,
          MockProvider(DepartmentsService, {
            fetchAll: () => of([])
          }),
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(DepartmentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDepartments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDepartments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);

    });

    /**
     * Use `loadDepartmentsSuccess` to manually update list
     */
    it('allDepartments$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDepartments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DepartmentsActions.loadDepartmentsSuccess({
          departments: [
            createDepartmentsEntity(1, 'AAA', [1,2]),
            createDepartmentsEntity(2, 'BBB', [3,4]),
          ],
        })
      );

      list = await readFirst(facade.allDepartments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
