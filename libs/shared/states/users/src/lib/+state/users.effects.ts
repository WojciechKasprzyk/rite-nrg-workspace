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
  private readonly departmentsFacade = inject(DepartmentsFacade);

  readonly init$ = this.createInitEffect();

  readonly delete$ = this.createDeleteEffect();
  readonly deleteSuccess$ = this.createDeleteSuccessEffect();

  readonly create$ = this.createCreateEffect();
  readonly createSuccess$ = this.createCreateSuccessEffect();

  readonly edit$ = this.createEditEffect();
  readonly editSuccess$ = this.createEditSuccessEffect();

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
          .pipe(map(({id}) => {
            return UsersActions.createUserSuccess({user: {...user, id}})
          }))
        ),
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
        tap(({user}) => this.departmentsFacade.addUserToDepartment(user.departmentId, user.id)),
        tap(() => this.router.navigateByUrl('')),
        map(() => UsersActions.initUsers())
      ),
    );
  }

  private createEditEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.editUser),
        switchMap(({user}) => this.usersService.update({
          id: user.id,
          name: user.name,
          email: user.email,
          }, `departmentId=${user.departmentId}`)
        ),
        map(() => UsersActions.editUserSuccess()),
        catchError((error) => {
          console.error('Error', error);
          return of(UsersActions.loadUsersFailure({ error }));
        })
      )
    );
  }

  private createEditSuccessEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.editUserSuccess),
        tap(() => this.departmentsFacade.init()),
        tap(() => this.router.navigateByUrl('')),
        map(() => UsersActions.initUsers())
      ),
    );
  }

}
