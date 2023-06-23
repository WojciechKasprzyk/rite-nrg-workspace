import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as DepartmentsActions from './departments.actions';
import { DepartmentsEffects } from './departments.effects';

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
