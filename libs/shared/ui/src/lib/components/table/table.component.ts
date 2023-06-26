import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { Entry } from "@rite-nrg-workspace/shared/api";
import { PaginatorModule, PaginatorState } from "primeng/paginator";
import { PaginatorPipe } from "../../pipes";

const defaultPagination: Required<PaginatorState> = {
  first: 0,
  page: 0,
  pageCount: 1,
  rows: 5,
} as const

@Component({
  selector: 'nrg-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, SharedModule, TableModule, PaginatorModule, PaginatorPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Entry> implements OnInit {
  @Input({required: true}) data!: T[];
  @Input({required: true}) loading!: boolean;
  @Input() selection: T | undefined;
  @Input() displayedColumns: Readonly<string[]> = [];
  @Input() fallbackMessage: string = 'No entries found.';

  @Output() selectionChange = new EventEmitter<T | undefined>();
  @Output() entryDelete = new EventEmitter<number>();
  @Output() entryEdit = new EventEmitter<number>();

  paginatorState: WritableSignal<PaginatorState> = signal(defaultPagination);

  ngOnInit() {
    const pageCount = Math.floor(this.data.length / defaultPagination.rows) + 1;
    this.paginatorState.set({
      ...defaultPagination,
      pageCount
    })
  }

  protected handleSelectionChange(entry: T | undefined) {
    this.selectionChange.observed && this.selectionChange.emit(entry);
  }

  protected deleteEntry(id: number) {
    this.entryDelete.observed && this.entryDelete.emit(id);
  }

  protected editEntry(id: number) {
    this.entryEdit.observed && this.entryEdit.emit(id);
  }

  protected onPageChange(e: PaginatorState) {
    console.log(e)
    this.paginatorState.set(e);
  }

}
