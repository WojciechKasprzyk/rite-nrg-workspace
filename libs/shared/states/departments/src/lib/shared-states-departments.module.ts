import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDepartments from './+state/departments.reducer';
import { DepartmentsEffects } from './+state/departments.effects';
import { DepartmentsFacade } from './+state/departments.facade';
import { SharedApiModule } from "@rite-nrg-workspace/shared/api";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDepartments.DEPARTMENTS_FEATURE_KEY,
      fromDepartments.departmentsReducer
    ),
    EffectsModule.forFeature([DepartmentsEffects]),
    SharedApiModule
  ],
  providers: [DepartmentsFacade],
})
export class SharedStatesDepartmentsModule {}
