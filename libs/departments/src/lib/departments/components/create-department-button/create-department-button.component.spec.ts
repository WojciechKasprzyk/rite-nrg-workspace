import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDepartmentButtonComponent } from './create-department-button.component';

describe('CreateDepartmentButtonComponent', () => {
  let component: CreateDepartmentButtonComponent;
  let fixture: ComponentFixture<CreateDepartmentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDepartmentButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDepartmentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
