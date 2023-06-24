import { Route } from '@angular/router';
import { CreateEditDepartmentComponent } from "./departments/components";

export const departmentsRoutes: Route[] = [
  {
    path: "create-department",
    component: CreateEditDepartmentComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: CreateEditDepartmentComponent
  }
];
