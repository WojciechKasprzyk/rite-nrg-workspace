import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersFacade } from "@rite-nrg-workspace/shared/states/users";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'nrg-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly usersFacade = inject(UsersFacade);
  private readonly departmentsFacade = inject(DepartmentsFacade);
  private readonly selectedDepartmentUsersIds$ = this.departmentsFacade.selectedDepartmentUsersIds$;
  readonly departmentUsers$ = this.getDepartmentUsersStream();
  readonly loading$ = this.usersFacade.loading$;
  readonly displayedColumns = ['name', 'email'] as const;
  readonly fallbackMessage = 'No users found.';

  constructor() {
    this.usersFacade.init();
  }

  deleteUser(id: number) {
    this.usersFacade.delete(id);
  }

  private getDepartmentUsersStream() {
    return this.selectedDepartmentUsersIds$
      .pipe(
        switchMap((ids) => this.usersFacade.selectEntitiesByIds(ids || [])),
      );
  }

  editUser(id: number) {
    this.router.navigate(['user', id], {relativeTo: this.route});
  }
}
