import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { UsersService } from "@rite-nrg-workspace/shared/api";

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  readonly init$ = this.createInitEffect();
  readonly delete$ = this.createDeleteEffect();
  readonly deleteSuccess$ = this.createDeleteSuccessEffect();

  private createInitEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.initUsers),
        switchMap(() => this.usersService.fetchAll()),
        map((users) => UsersActions.loadUsersSuccess({ users })),
        catchError((error) => {
          console.error('Error', error);
          return of(UsersActions.loadUsersFailure({ error }));
        })
      )
    );
  }

  private createDeleteEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.deleteUser),
        switchMap(({id}) => this.usersService.delete(id)),
        map(() => UsersActions.deleteUserSuccess()),
        catchError((error) => {
          console.error('Error', error);
          return of(UsersActions.loadUsersFailure({ error }));
        })
      )
    );
  }

  private createDeleteSuccessEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.deleteUserSuccess),
        map(() => UsersActions.initUsers())
      ),
    );
  }
}
