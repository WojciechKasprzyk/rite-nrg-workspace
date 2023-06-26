import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedStatesDepartmentsModule } from '@rite-nrg-workspace/shared/states/departments';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LetDirective } from '@ngrx/component';
import { SearchComponent, TableComponent } from '@rite-nrg-workspace/shared/ui';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CreateEditDepartmentButtonComponent, CreateEditDepartmentComponent } from './departments/components';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from "@angular/router";
import { departmentsRoutes } from "./departments.routes";

const PRIME_NG_COMPONENTS = [InputTextModule, ButtonModule, DialogModule];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ...PRIME_NG_COMPONENTS,
    SharedStatesDepartmentsModule,
    LetDirective,
    TableComponent,
    ReactiveFormsModule,
    RouterModule.forChild(departmentsRoutes),
    SearchComponent,
  ],
  declarations: [
    DepartmentsComponent,
    CreateEditDepartmentComponent,
    CreateEditDepartmentButtonComponent,
  ],
  exports: [DepartmentsComponent],
})
export class DepartmentsModule {}
