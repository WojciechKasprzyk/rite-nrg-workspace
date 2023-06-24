import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';
import { SharedStatesDepartmentsModule } from "@rite-nrg-workspace/shared/states/departments";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LetDirective } from "@ngrx/component";
import { DialogComponent, TableComponent } from "@rite-nrg-workspace/shared/ui";

const PRIME_NG_COMPONENTS = [
  TableModule,
  ButtonModule,
  DialogModule,
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ...PRIME_NG_COMPONENTS,
    SharedStatesDepartmentsModule,
    LetDirective,
    TableComponent,
    DialogComponent
  ],
  declarations: [DepartmentsComponent],
  exports: [
    DepartmentsComponent,
  ]
})
export class DepartmentsModule {}
