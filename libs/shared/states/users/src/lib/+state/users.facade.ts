import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  readonly loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  readonly allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  readonly selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  selectEntitiesByIds(ids: number[]) {
    return this.store.select(UsersSelectors.selectEntitiesByIds(ids));
  }
}
