import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { DepartmentFormService } from "../../services";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { Router } from "@angular/router";
import { filter, map } from "rxjs";
import { Department } from "@rite-nrg-workspace/shared/api";

@Component({
  selector: 'nrg-create-edit-department',
  templateUrl: './create-edit-department.component.html',
  styleUrls: ['./create-edit-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DepartmentFormService]
})
export class CreateEditDepartmentComponent implements OnInit {
  @Input() id?: string | undefined;
  protected readonly departmentFormService = inject(DepartmentFormService);
  protected readonly form = this.departmentFormService.form;
  protected readonly departmentsFacade = inject(DepartmentsFacade);
  protected readonly loading$ = this.departmentsFacade.loading$;
  protected readonly router = inject(Router);

  ngOnInit() {
    this.setFormEditData();
  }

  handleConfirm(){
    if (this.form.invalid) {
      return;
    }

    const department = this.departmentFormService.formRawData;

    if (this.id != null) {
      department.id = +this.id
      this.editDepartment(department as Omit<Department, 'users'>)
    } else {
      this.createDepartment(department)
    }
  }

  redirectBack() {
    this.router.navigateByUrl('');
  }

  private setFormEditData() {
    if (this.id != null) {
      this.departmentsFacade.getDepartmentById(+this.id)
        .pipe(
          filter(department => !!department),
          map(department => department?.name || '')
        ).subscribe(name => {
        this.form.setValue({name});
      })
    }
  }

  private editDepartment(department: Omit<Department, 'users'>) {
    this.departmentsFacade.editDepartment(department);
  }

  private createDepartment(department: Omit<Department, 'id' | 'users'>) {
    this.departmentsFacade.createDepartment(department);

  }
}
