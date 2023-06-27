import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditDepartmentComponent } from './create-edit-department.component';
import { MockModule, MockProviders } from "ng-mocks";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";

describe('CreateDepartmentComponent', () => {
  let component: CreateEditDepartmentComponent;
  let fixture: ComponentFixture<CreateEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(DialogModule),
        MockModule(ReactiveFormsModule)
      ],
      declarations: [CreateEditDepartmentComponent],
      providers: [
        MockProviders(DepartmentsFacade)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
