import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { Department } from "@rite-nrg-workspace/shared/api";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";

@Component({
  selector: 'nrg-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly departmentsFacade = inject(DepartmentsFacade);
  private readonly searchTerm = new BehaviorSubject<string>('');
  readonly allDepartments$!: Observable<Department[]>;
  readonly selectedDepartment$ = this.departmentsFacade.selectedDepartment$;
  readonly loading$ = this.departmentsFacade.loading$;
  readonly displayedColumns = ['name'] as const;
  readonly fallbackMessage = 'No departments found.';

  constructor() {
    this.departmentsFacade.init();
    this.allDepartments$ = combineLatest([
        this.departmentsFacade.allDepartments$,
        this.searchTerm.asObservable()
      ]).pipe(map(([departments, searchTerm]) => this.filterDepartmentsBySearchTerm(departments, searchTerm)))
  }

  private filterDepartmentsBySearchTerm(departments: Department[], searchTerm: string): Department[] {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm) {
      return departments.filter(d =>
        d.name.toLowerCase().includes(searchTerm)
        || d.id.toString().includes(searchTerm))
    }
    return departments;
  }

  protected selectionChange(department: Department | undefined) {
    this.departmentsFacade.selectDepartment(department?.id);
  }

  protected deleteDepartment(id: number) {
    this.departmentsFacade.delete(id);
  }

  protected editDepartment(id: number) {
    this.router.navigate(['department', id], {relativeTo: this.route});
  }

  protected onSearch(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }
}
