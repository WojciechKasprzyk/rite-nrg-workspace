import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as DepartmentsActions from './departments.actions';
import * as DepartmentsFeature from './departments.reducer';
import * as DepartmentsSelectors from './departments.selectors';
import { first, map } from "rxjs";
import { Department, Entry } from "@rite-nrg-workspace/shared/api";

@Injectable()
export class DepartmentsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  readonly loaded$ = this.store.select(DepartmentsSelectors.selectDepartmentsLoaded);
  readonly loading$ = this.loaded$.pipe(map(loaded => !loaded));
  readonly allDepartments$ = this.store.select(DepartmentsSelectors.selectAllDepartments);
  readonly selectedDepartment$ = this.store.select(DepartmentsSelectors.selectEntity);
  readonly selectedDepartmentUsersIds$ = this.store.select(DepartmentsSelectors.selectDepartmentEntityUsers);
  readonly departmentsToDropdown$ = this.store.select(DepartmentsSelectors.selectDepartmentsToDropdown);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DepartmentsActions.initDepartments());
  }

  selectDepartment(id: number | undefined) {
    this.store.dispatch(DepartmentsActions.selectDepartment({id}));
  }

  delete(id: number) {
    this.store.dispatch(DepartmentsActions.deleteDepartment({id}))
  }

  createDepartment(department: Omit<Department, 'id' | 'users'>) {
    this.store.dispatch(DepartmentsActions.createDepartment(department));
  }

  editDepartment(department: Partial<Department> & Entry) {
    //It's necessary to pass whole object while updating
    this.getDepartmentById(department.id)
      .pipe(first())
      .subscribe(d => {
        const mergedDepartment = {
          ...d,
          ...department,
        } as Department;
        this.store.dispatch(DepartmentsActions.editDepartment({department: mergedDepartment}));
      })
  }

  addUserToDepartment(departmentId: number, userId: number) {
    this.getDepartmentById(departmentId)
      .pipe(
        first(),
        map((d) => (d as Department).users)
      ).subscribe(users => {
      this.editDepartment({
        id: departmentId,
        users: [...users, userId]
      })
    })
  }

  removeUserToDepartment(userId: number) {
    this.getDepartmentByUserId(userId)
      .pipe(
        first(),
        map((d) => d as Department)
      ).subscribe(({id, users}) => {
      this.editDepartment({
        id,
        users: users.filter(id => id != userId)
      })
    })
  }

  getDepartmentById(id: number) {
    return this.store.select(DepartmentsSelectors.selectEntityById(id));
  }

  getDepartmentByUserId(id: number) {
    return this.store.select(DepartmentsSelectors.selectDepartmentByUserId(id));
  }
}
