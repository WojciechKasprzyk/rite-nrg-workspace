import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'nrg-create-edit-department-button',
  templateUrl: './create-edit-department-button.component.html',
  styleUrls: ['./create-edit-department-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditDepartmentButtonComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  createDepartment() {
    this.router.navigate(['create-department'], {relativeTo: this.route});
  }
}
