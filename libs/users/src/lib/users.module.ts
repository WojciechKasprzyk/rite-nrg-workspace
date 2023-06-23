import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SharedStatesUsersModule } from "@rite-nrg-workspace/shared/states/users";

@NgModule({
  imports: [
    CommonModule,
    SharedStatesUsersModule
  ],
  declarations: [UsersComponent],
  exports: [
    UsersComponent
  ]
})
export class UsersModule {}
