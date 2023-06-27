import { TestBed } from '@angular/core/testing';

import { UserFormService } from './user-form.service';
import { MockProvider } from "ng-mocks";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { of } from "rxjs";

describe('UserFormService', () => {
  let service: UserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserFormService,
        MockProvider(DepartmentsFacade, {
          selectedDepartment$: of()
        })
      ]
    });
    service = TestBed.inject(UserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
