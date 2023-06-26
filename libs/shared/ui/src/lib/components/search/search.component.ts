import { ChangeDetectionStrategy, Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'nrg-search',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  readonly model = signal('');

  constructor() {
    effect(() => {
      this.search.observed && this.search.emit(this.model());
    })
  }
}
