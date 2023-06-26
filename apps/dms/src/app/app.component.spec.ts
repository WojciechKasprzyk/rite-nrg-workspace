import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DepartmentsModule } from "@rite-nrg-workspace/departments";
import { UsersModule } from "@rite-nrg-workspace/users";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DepartmentsModule,
        UsersModule,
        StoreModule.forRoot(),
        EffectsModule.forRoot()
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});
