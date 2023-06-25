import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";

@Component({
  selector: 'nrg-create-edit-user-button',
  templateUrl: './create-edit-user-button.component.html',
  styleUrls: ['./create-edit-user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditUserButtonComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly selectedDepartment$ = inject(DepartmentsFacade).selectedDepartment$;

  createUser() {
    this.router.navigate(['create-user'], {relativeTo: this.route});
  }
}
