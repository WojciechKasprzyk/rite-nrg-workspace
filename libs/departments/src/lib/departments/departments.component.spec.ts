import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentsComponent } from './departments.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MockDirective, MockProvider } from "ng-mocks";
import { DepartmentsFacade } from "@rite-nrg-workspace/shared/states/departments";
import { LetDirective } from "@ngrx/component";

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockDirective(LetDirective)
      ],
      declarations: [DepartmentsComponent],
      providers: [
        MockProvider(DepartmentsFacade)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
