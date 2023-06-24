import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DepartmentFormService } from "../../services";

@Component({
  selector: 'nrg-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DepartmentFormService]
})
export class DepartmentFormComponent {}
