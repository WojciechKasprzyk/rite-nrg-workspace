import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as DepartmentsActions from './departments.actions';
import * as DepartmentsFeature from './departments.reducer';
import { DepartmentsService } from "@rite-nrg-workspace/shared/api";

@Injectable()
export class DepartmentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly departmentsService = inject(DepartmentsService);

  readonly init$ = this.createInitEffect();
  readonly delete$ = this.createDeleteEffect();
  readonly deleteSuccess$ = this.createDeleteSuccessEffect();

  private createInitEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(DepartmentsActions.initDepartments),
        switchMap(() => this.departmentsService.fetchAll()),
        map((departments) =>
          DepartmentsActions.loadDepartmentsSuccess({departments})
        ),
        catchError((error) => {
          console.error('Error', error);
          return of(DepartmentsActions.loadDepartmentsFailure({error}));
        })
      )
    );
  }

  private createDeleteEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(DepartmentsActions.deleteDepartment),
        switchMap(({id}) => this.departmentsService.delete(id)),
        map(() => DepartmentsActions.deleteDepartmentSuccess()),
        catchError((error) => {
          console.error('Error', error);
          return of(DepartmentsActions.deleteDepartmentFailure({error}));
        })
      )
    );
  }

  private createDeleteSuccessEffect() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType(DepartmentsActions.deleteDepartmentSuccess),
        map(() => DepartmentsActions.initDepartments())
      ),
    );
  }
}
