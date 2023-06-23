import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SharedStatesUsersModule } from "@rite-nrg-workspace/shared/states/users";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

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
    SharedStatesUsersModule
  ],
  declarations: [UsersComponent],
  exports: [
    UsersComponent
  ]
})
export class UsersModule {}
