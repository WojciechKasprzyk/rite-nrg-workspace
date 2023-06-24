import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'nrg-create-department-button',
  templateUrl: './create-department-button.component.html',
  styleUrls: ['./create-department-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDepartmentButtonComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  createDepartment() {
    this.router.navigate(['create-department'], {relativeTo: this.route});
  }
}
