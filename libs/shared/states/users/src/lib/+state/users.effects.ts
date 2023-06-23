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

  init$ = createEffect(() =>
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
