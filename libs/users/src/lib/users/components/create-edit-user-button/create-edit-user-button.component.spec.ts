import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditUserButtonComponent } from './create-edit-user-button.component';

describe('CreateEditUserButtonComponent', () => {
  let component: CreateEditUserButtonComponent;
  let fixture: ComponentFixture<CreateEditUserButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditUserButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
