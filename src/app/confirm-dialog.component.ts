import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() message = 'Tem certeza?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
