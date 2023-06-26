import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SharedStatesUsersModule } from '@rite-nrg-workspace/shared/states/users';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LetDirective } from '@ngrx/component';
import { SearchComponent, TableComponent } from '@rite-nrg-workspace/shared/ui';
import { CreateEditUserButtonComponent, CreateEditUserComponent } from "./users/components";
import { RouterModule } from "@angular/router";
import { usersRoutes } from "./users.routes";
import { InputTextModule } from "primeng/inputtext";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";

const PRIME_NG_COMPONENTS = [
  TableModule,
  ButtonModule,
  DialogModule,
  InputTextModule,
  DropdownModule
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ...PRIME_NG_COMPONENTS,
    SharedStatesUsersModule,
    LetDirective,
    TableComponent,
    RouterModule.forChild(usersRoutes),
    ReactiveFormsModule,
    SearchComponent,
  ],
  declarations: [
    UsersComponent,
    CreateEditUserComponent,
    CreateEditUserButtonComponent,
  ],
  exports: [UsersComponent],
})
export class UsersModule {
}
