import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as DepartmentsActions from './departments.actions';
import * as DepartmentsFeature from './departments.reducer';

@Injectable()
export class DepartmentsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentsActions.initDepartments),
      switchMap(() =>
        of(DepartmentsActions.loadDepartmentsSuccess({ departments: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(DepartmentsActions.loadDepartmentsFailure({ error }));
      })
    )
  );
}
