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
  readonly loaded$ = this.store.pipe(
    select(DepartmentsSelectors.selectDepartmentsLoaded)
  );
  readonly allDepartments$ = this.store.pipe(
    select(DepartmentsSelectors.selectAllDepartments)
  );
  readonly selectedDepartment$ = this.store.pipe(
    select(DepartmentsSelectors.selectEntity)
  );
  readonly selectedDepartmentUsersIds$ = this.store.pipe(
    select(DepartmentsSelectors.selectDepartmentEntityUsers)
  );

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
}
