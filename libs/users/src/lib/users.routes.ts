import { Route } from '@angular/router';
import { CreateEditUserComponent } from "./users/components";

export const usersRoutes: Route[] = [
  {
    path: "create-user",
    component: CreateEditUserComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/:id',
    component: CreateEditUserComponent
  }
];
