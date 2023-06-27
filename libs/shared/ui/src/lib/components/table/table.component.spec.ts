import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Entry } from "@rite-nrg-workspace/shared/api";

describe('TableComponent', () => {
  let component: TableComponent<Entry>;
  let fixture: ComponentFixture<TableComponent<Entry>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    setInputs();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function setInputs() {
    component.data = [
      {id: 1},
      {id: 2},
    ];
    component.loading = false;
  }
});
