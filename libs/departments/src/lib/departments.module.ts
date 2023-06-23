import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedStatesDepartmentsModule } from "@rite-nrg-workspace/shared/states/departments";

@NgModule({
  imports: [
    CommonModule,
    SharedStatesDepartmentsModule
  ],
  declarations: [DepartmentsComponent],
  exports: [
    DepartmentsComponent,
  ]
})
export class DepartmentsModule {}
