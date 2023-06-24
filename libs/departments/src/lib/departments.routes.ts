import { Route } from '@angular/router';
import { CreateDepartmentComponent } from "./departments/components";

export const departmentsRoutes: Route[] = [
  {
    path: "create-department",
    component: CreateDepartmentComponent,
    pathMatch: 'full'
  }
];
