import { TestBed } from '@angular/core/testing';

import { DepartmentFormService } from './department-form.service';

describe('DepartmentFormService', () => {
  let service: DepartmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentFormService
      ]
    });
    service = TestBed.inject(DepartmentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
