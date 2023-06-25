import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { UsersService } from "@rite-nrg-workspace/shared/api";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly usersService = inject(UsersService);

  readonly init$ = this.createInitEffect();

  readonly delete$ = this.createDeleteEffect();
  readonly deleteSuccess$ = this.createDeleteSuccessEffect();

  readonly create$ = this.createCreateEffect();
  readonly createSuccess$ = this.createCreateSuccessEffect();

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
          return of(UsersActions.deleteUserFailure({ error }));
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

  private createCreateEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.createUser),
        switchMap(({user}) => this.usersService.create({
          name: user.name,
          email: user.email,
          })
          .pipe(map(() => user))
        ),
        // switchMap((user) => this.usersService.)
        map(() => UsersActions.createUserSuccess()),
        catchError((error) => {
          console.error('Error', error);
          return of(UsersActions.loadUsersFailure({ error }));
        })
      )
    );
  }

  private createCreateSuccessEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.createUserSuccess),
        // map((user) => DepartmentsFacade)
        tap(() => this.router.navigateByUrl('')),
        map(() => UsersActions.initUsers())
      ),
    );
  }
}
