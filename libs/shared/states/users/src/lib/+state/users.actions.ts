import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: UsersEntity[] }>()
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[Users/API] Delete User',
  props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
  '[Users/API] Delete User Success'
);

export const deleteUserFailure = createAction(
  '[Users/API] Delete User Failure',
  props<{ error: any }>()
);

