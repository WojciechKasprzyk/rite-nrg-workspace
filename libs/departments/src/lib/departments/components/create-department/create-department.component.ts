import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DepartmentFormService } from "../../services";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { Router } from "@angular/router";

@Component({
  selector: 'nrg-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DepartmentFormService]
})
export class CreateDepartmentComponent {
  protected readonly form= inject(DepartmentFormService).form;
  protected readonly departmentsFacade= inject(DepartmentsFacade);
  protected readonly router= inject(Router);
  protected readonly cdr= inject(ChangeDetectorRef);

  handleConfirm() {
    const department = {
      name: this.form.get('name')?.value ?? '',
    };
    this.departmentsFacade.createDepartment(department);
  }

  redirectBack() {
    this.router.navigateByUrl('');
  }
}
