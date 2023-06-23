import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersFacade } from "@rite-nrg-workspace/shared/states/users";

@Component({
  selector: 'nrg-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly usersFacade = inject(UsersFacade);
  readonly allUsers$ = this.usersFacade.allUsers$;

  constructor() {
    this.usersFacade.init();
  }
}
