import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as DepartmentsActions from './departments.actions';
import * as DepartmentsFeature from './departments.reducer';
import * as DepartmentsSelectors from './departments.selectors';
import { map } from "rxjs";

@Injectable()
export class DepartmentsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  readonly loaded$ = this.store.select(DepartmentsSelectors.selectDepartmentsLoaded);
  readonly loading$ = this.loaded$.pipe(map(loaded => !loaded));
  readonly allDepartments$ = this.store.select(DepartmentsSelectors.selectAllDepartments);
  readonly selectedDepartment$ = this.store.select(DepartmentsSelectors.selectEntity);
  readonly selectedDepartmentUsersIds$ = this.store.select(DepartmentsSelectors.selectDepartmentEntityUsers);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DepartmentsActions.initDepartments());
  }

  selectDepartment(id: number| undefined) {
    this.store.dispatch(DepartmentsActions.selectDepartment({id}));
  }

  delete(id: number) {
    this.store.dispatch(DepartmentsActions.deleteDepartment({id}))
  }
}
