import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as DepartmentsActions from './departments.actions';
import { DepartmentsEffects } from './departments.effects';
import { MockProvider } from "ng-mocks";
import { DepartmentsService } from "@rite-nrg-workspace/shared/api";

describe('DepartmentsEffects', () => {
  let actions: Observable<Action>;
  let effects: DepartmentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DepartmentsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        MockProvider(DepartmentsService, {
          fetchAll: () => of([])
        })
      ],
    });

    effects = TestBed.inject(DepartmentsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DepartmentsActions.initDepartments() });

      const expected = hot('-a-|', {
        a: DepartmentsActions.loadDepartmentsSuccess({ departments: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
