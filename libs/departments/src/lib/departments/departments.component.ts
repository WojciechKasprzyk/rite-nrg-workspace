import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { Department } from "@rite-nrg-workspace/shared/api";

@Component({
  selector: 'nrg-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent {
  private readonly departmentsFacade = inject(DepartmentsFacade);
  readonly allDepartments$ = this.departmentsFacade.allDepartments$;
  selectedDepartment: Department | null = null;
  constructor() {
    this.departmentsFacade.init();
  }
}
