import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DepartmentsComponent],
  exports: [
    DepartmentsComponent
  ]
})
export class DepartmentsModule {}
