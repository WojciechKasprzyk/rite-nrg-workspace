import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as DepartmentsActions from './departments.actions';
import * as DepartmentsFeature from './departments.reducer';
import * as DepartmentsSelectors from './departments.selectors';

@Injectable()
export class DepartmentsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(DepartmentsSelectors.selectDepartmentsLoaded)
  );
  allDepartments$ = this.store.pipe(
    select(DepartmentsSelectors.selectAllDepartments)
  );
  selectedDepartment$ = this.store.pipe(
    select(DepartmentsSelectors.selectEntity)
  );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DepartmentsActions.initDepartments());
  }

  selectDepartment(id: number) {
    this.store.dispatch(DepartmentsActions.selectDepartment({id}));
  }
}
