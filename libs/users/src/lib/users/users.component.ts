import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersFacade } from "@rite-nrg-workspace/shared/states/users";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "@rite-nrg-workspace/shared/api";

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
  private readonly searchTerm = new BehaviorSubject<string>('');
  protected readonly selectedDepartment$ = inject(DepartmentsFacade).selectedDepartment$;
  private readonly selectedDepartmentUsersIds$ = this.departmentsFacade.selectedDepartmentUsersIds$;
  readonly departmentUsers$!: Observable<User[]>;
  readonly loading$ = this.usersFacade.loading$;
  readonly displayedColumns = ['name', 'email'] as const;
  readonly fallbackMessage = 'No users found.';

  constructor() {
    this.usersFacade.init();
    this.departmentUsers$ = combineLatest([
      this.getDepartmentUsersStream(),
      this.searchTerm.asObservable()
    ]).pipe(map(([departments, searchTerm]) => this.filterDepartmentsBySearchTerm(departments, searchTerm)))

  }

  private filterDepartmentsBySearchTerm(users: User[], searchTerm: string): User[] {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm) {
      return users.filter(u =>
        u.name.toLowerCase().includes(searchTerm)
        || u.email.toLowerCase().includes(searchTerm)
        || u.id.toString().includes(searchTerm)
      )
    }
    return users;
  }

  private getDepartmentUsersStream() {
    return this.selectedDepartmentUsersIds$
      .pipe(
        switchMap((ids) => this.usersFacade.selectEntitiesByIds(ids || [])),
      );
  }

  protected deleteUser(id: number) {
    this.usersFacade.delete(id);
  }

  protected editUser(id: number) {
    this.router.navigate(['user', id], {relativeTo: this.route});
  }

  protected onSearch(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }
}
