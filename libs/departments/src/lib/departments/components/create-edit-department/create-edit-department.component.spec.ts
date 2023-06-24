import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditDepartmentComponent } from './create-edit-department.component';

describe('CreateDepartmentComponent', () => {
  let component: CreateEditDepartmentComponent;
  let fixture: ComponentFixture<CreateEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditDepartmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
