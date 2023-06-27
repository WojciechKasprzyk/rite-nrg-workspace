import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditDepartmentButtonComponent } from './create-edit-department-button.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MockModule } from "ng-mocks";
import { ButtonModule } from "primeng/button";

describe('CreateDepartmentButtonComponent', () => {
  let component: CreateEditDepartmentButtonComponent;
  let fixture: ComponentFixture<CreateEditDepartmentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockModule(ButtonModule)
      ],
      declarations: [CreateEditDepartmentButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditDepartmentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
