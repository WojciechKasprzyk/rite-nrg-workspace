import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersFacade } from "@rite-nrg-workspace/shared/states/users";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { switchMap } from "rxjs";

@Component({
  selector: 'nrg-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly departmentsFacade = inject(DepartmentsFacade);
  private readonly selectedDepartmentUsersIds$ = this.departmentsFacade.selectedDepartmentUsersIds$;
  readonly departmentUsers$ = this.getDepartmentUsersStream();
  readonly loading$ = this.usersFacade.loading$;

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
}
