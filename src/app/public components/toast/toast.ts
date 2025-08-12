import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css'],
})
export class Toast implements OnInit {
  toastState$!: Observable<{ message: string; type: 'success' | 'error' } | null>;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastState$ = this.toastService.toastState$;
  }

  close() {
    this.toastService.hide();
  }
}
