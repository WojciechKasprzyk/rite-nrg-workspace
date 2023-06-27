import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditUserComponent } from './create-edit-user.component';
import { MockDirective, MockModule, MockProvider } from "ng-mocks";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { of } from "rxjs";
import { UsersFacade } from "@rite-nrg-workspace/shared/states/users";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { LetDirective } from "@ngrx/component";

describe('CreateEditUserComponent', () => {
  let component: CreateEditUserComponent;
  let fixture: ComponentFixture<CreateEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(ReactiveFormsModule),
        MockModule(DialogModule),
        MockDirective(LetDirective)
      ],
      declarations: [CreateEditUserComponent],
      providers: [
        MockProvider(UsersFacade),
        MockProvider(DepartmentsFacade, {
          selectedDepartment$: of()
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
