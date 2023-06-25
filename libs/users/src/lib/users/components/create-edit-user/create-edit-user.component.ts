import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "@rite-nrg-workspace/shared/api";
import { filter, map } from "rxjs";
import { UserFormService } from "../../services";
import { UsersFacade, WriteUser } from "@rite-nrg-workspace/shared/states/users";

@Component({
  selector: 'nrg-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFormService]
})
export class CreateEditUserComponent implements OnInit {
  @Input() id?: string | undefined;
  private readonly userFormService = inject(UserFormService);
  protected readonly usersFacade = inject(UsersFacade);
  protected readonly router = inject(Router);
  protected readonly form = this.userFormService.form;
  protected readonly departmentsToDropdown$ = this.userFormService.departmentsToDropdown$;

  ngOnInit() {
    this.setFormEditData();
  }

  handleConfirm(){
    const user: {
      name: string,
      email: string,
      departmentId: number,
      id: number | undefined
    } = {
      name: this.form.get('name')?.value ?? '',
      email: this.form.get('email')?.value ?? '',
      departmentId: this.form.get('departmentId')?.value || NaN,
      id: undefined,
    };

    if (this.id != null) {
      user.id = +this.id
      this.editDepartment(user as WriteUser)
    } else {
      this.createDepartment(user)
    }
  }

  redirectBack() {
    this.router.navigateByUrl('');
  }

  private setFormEditData() {
    if (this.id != null) {
      this.usersFacade.getUserById(+this.id)
        .pipe(
          filter(user => !!user),
          map((user) => user as User)
        ).subscribe(({name, email}) => {
        this.form.patchValue({name, email});
      })
    }
  }

  private editDepartment(user: WriteUser) {
    // this.usersFacade.editUser(user);
  }

  private createDepartment(user: Omit<WriteUser, 'id'>) {
    this.usersFacade.createUser(user);
  }
}
