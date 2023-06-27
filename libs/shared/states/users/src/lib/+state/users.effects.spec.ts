import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';
import { MockProvider } from "ng-mocks";
import { UsersService } from "@rite-nrg-workspace/shared/api";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";

describe('UsersEffects', () => {
  let actions: Observable<Action>;
  let effects: UsersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UsersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        MockProvider(DepartmentsFacade),
        MockProvider(UsersService, {
          fetchAll: () => of([])
        })
      ],
    });

    effects = TestBed.inject(UsersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.initUsers() });

      const expected = hot('-a-|', {
        a: UsersActions.loadUsersSuccess({ users: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
