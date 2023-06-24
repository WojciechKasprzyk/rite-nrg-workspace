import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditDepartmentButtonComponent } from './create-edit-department-button.component';

describe('CreateDepartmentButtonComponent', () => {
  let component: CreateEditDepartmentButtonComponent;
  let fixture: ComponentFixture<CreateEditDepartmentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
