import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { Department } from "@rite-nrg-workspace/shared/api";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'nrg-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly departmentsFacade = inject(DepartmentsFacade);
  readonly allDepartments$ = this.departmentsFacade.allDepartments$;
  readonly selectedDepartment$ = this.departmentsFacade.selectedDepartment$;
  readonly loading$ = this.departmentsFacade.loading$;
  readonly displayedColumns = ['name'] as const;
  readonly fallbackMessage = 'No departments found.';

  constructor() {
    this.departmentsFacade.init();
  }

  selectionChange(department: Department | undefined) {
    this.departmentsFacade.selectDepartment(department?.id);
  }

  deleteDepartment(id: number) {
    this.departmentsFacade.delete(id);
  }

  editDepartment(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }
}
