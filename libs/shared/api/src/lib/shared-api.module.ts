import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./data/in-memory-data.service";
import { DepartmentsService, UsersService } from "./services";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 500}),
  ],
  providers: [
    DepartmentsService,
    UsersService
  ]
})
export class SharedApiModule {
}
