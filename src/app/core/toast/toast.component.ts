import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/toast/toast.service';
import { Observable } from 'rxjs';
import { Toast } from '../../core/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  toast$!: Observable<Toast | null>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }
}
