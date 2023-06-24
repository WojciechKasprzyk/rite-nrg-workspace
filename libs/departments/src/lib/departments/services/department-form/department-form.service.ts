import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Injectable()
export class DepartmentFormService {
  private readonly fb = inject(FormBuilder)
  readonly form = this.fb.group({
    name: ['', Validators.required],
  })
}
