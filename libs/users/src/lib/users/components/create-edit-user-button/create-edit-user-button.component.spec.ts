import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditUserButtonComponent } from './create-edit-user-button.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MockModule, MockProvider } from "ng-mocks";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { ButtonModule } from "primeng/button";

describe('CreateEditUserButtonComponent', () => {
  let component: CreateEditUserButtonComponent;
  let fixture: ComponentFixture<CreateEditUserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockModule(ButtonModule)
      ],
      declarations: [CreateEditUserButtonComponent],
      providers: [
        MockProvider(DepartmentsFacade)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
