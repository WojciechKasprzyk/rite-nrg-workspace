import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'nrg-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input() buttonLabel: string = 'Show Dialog';
  @Input() header: string = 'Header';
  @Output() confirm = new EventEmitter();
  visible = false;

  showDialog() {
    this.visible = true;
  }

  handleConfirm() {
    this.visible = false;
    this.confirm.observed && this.confirm.emit();
  }
}
