import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { Entry } from "@rite-nrg-workspace/shared/api";

@Component({
  selector: 'nrg-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, SharedModule, TableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Entry> {
  @Input({required: true}) data!: T[];
  @Input({required: true}) loading!: boolean;
  @Input() selection: T | undefined;
  @Input() displayedColumns: Readonly<string[]> = [];
  @Input() fallbackMessage: string = 'No entries found.';

  @Output() selectionChange = new EventEmitter<T | undefined>();
  @Output() entryDelete = new EventEmitter<number>();
  @Output() entryEdit = new EventEmitter<number>();

  handleSelectionChange(entry: T | undefined) {
    this.selectionChange.observed && this.selectionChange.emit(entry);
  }

  deleteEntry(id: number) {
    this.entryDelete.observed && this.entryDelete.emit(id);
  }

  editEntry(id: number) {
    this.entryEdit.observed && this.entryEdit.emit(id);

  }

}
