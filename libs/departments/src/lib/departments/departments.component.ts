import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";

@Component({
  selector: 'nrg-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent {
  private readonly departmentsFacade = inject(DepartmentsFacade);

  constructor() {
    this.departmentsFacade.init();
  }
}
