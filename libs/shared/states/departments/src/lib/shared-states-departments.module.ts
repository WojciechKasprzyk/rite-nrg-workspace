import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDepartments from './+state/departments.reducer';
import { DepartmentsEffects } from './+state/departments.effects';
import { DepartmentsFacade } from './+state/departments.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDepartments.DEPARTMENTS_FEATURE_KEY,
      fromDepartments.departmentsReducer
    ),
    EffectsModule.forFeature([DepartmentsEffects]),
  ],
  providers: [DepartmentsFacade],
})
export class SharedStatesDepartmentsModule {}
