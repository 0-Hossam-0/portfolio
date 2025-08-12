import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{ message: string; type: 'success' | 'error' } | null>(null);
  toastState$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' = 'success') {
    this.toastSubject.next({ message, type });
    setTimeout(() => this.hide(), 3000);
  }

  hide() {
    this.toastSubject.next(null);
  }
}
