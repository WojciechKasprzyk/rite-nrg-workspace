import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';
import { first, map } from "rxjs";
import { WriteUser } from "./users.models";
import { User } from "@rite-nrg-workspace/shared/api";

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  readonly loaded$ = this.store.select(UsersSelectors.selectUsersLoaded);
  readonly loading$ = this.loaded$.pipe(map(loaded => !loaded));
  readonly allUsers$ = this.store.select(UsersSelectors.selectAllUsers);
  readonly selectedUsers$ = this.store.select(UsersSelectors.selectEntity);

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

  delete(id: number) {
    this.store.dispatch(UsersActions.deleteUser({id}));
  }

  createUser(user: Omit<WriteUser, 'id'>) {
    this.store.dispatch(UsersActions.createUser({user}))
  }

  editUser(user: WriteUser) {
    this.store.dispatch(UsersActions.editUser({user}));
  }

  getUserById(id: number) {
    return this.store.select(UsersSelectors.getUserById(id))
  }
}
