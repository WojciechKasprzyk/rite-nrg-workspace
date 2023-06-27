import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MockDirective, MockProvider, MockProviders } from "ng-mocks";
import { UsersFacade } from "@rite-nrg-workspace/shared/states/users";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { of } from "rxjs";
import { LetDirective } from "@ngrx/component";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockDirective(LetDirective)
      ],
      declarations: [UsersComponent],
      providers: [
        MockProvider(UsersFacade),
        MockProvider(DepartmentsFacade, {
          selectedDepartmentUsersIds$: of([])
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
