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

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentsActions.initDepartments),
      switchMap(() => this.departmentsService.fetchAll()),
      map((departments) =>
        DepartmentsActions.loadDepartmentsSuccess({ departments })
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(DepartmentsActions.loadDepartmentsFailure({ error }));
      })
    )
  );
}
