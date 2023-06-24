import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";

type TableEntry = {id: number} & Record<string, string>

@Component({
  selector: 'nrg-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, SharedModule, TableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input({required: true}) data!: TableEntry[];
  @Input({required: true}) loading!: boolean;
  @Input() selected: TableEntry | undefined;
  @Input() displayedColumns: string[] = [];
  @Input() fallbackMessage: string = 'No entries found.';

  @Output() entryDelete = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<TableEntry>();

  handleSelectionChange(entry: TableEntry) {
    this.selectionChange.observed && this.selectionChange.emit(entry);
  }

  deleteDepartment(id: number) {
    this.entryDelete.observed && this.entryDelete.emit(id);
  }

}
