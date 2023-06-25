import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { filter, map, tap } from "rxjs";
import { Department } from "@rite-nrg-workspace/shared/api";
import { Router } from "@angular/router";

@Injectable()
export class UserFormService {
  private readonly departmentsFacade = inject(DepartmentsFacade);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly departmentsToDropdown$ = this.departmentsFacade.departmentsToDropdown$;
  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    departmentId: [NaN, Validators.required]
  })

  constructor() {
    this.departmentsFacade.selectedDepartment$
      .pipe(
        tap(d => this.redirectWhenNoDepartmentSelected(d)),
        filter(Boolean),
        map((department: Department) => department.id)
      ).subscribe(id => {
        this.form.controls.departmentId.setValue(id);
        this.form.controls.departmentId.disable();
      })
  }

  private redirectWhenNoDepartmentSelected(department: Department | undefined) {
    if (!department) {
      this.router.navigateByUrl('');
    }
  }
}
