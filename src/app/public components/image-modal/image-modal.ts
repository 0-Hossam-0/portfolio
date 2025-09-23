import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.html',
  styleUrls: ['./image-modal.css'],
})
export class ImageModalComponent {
  @Input() imageUrl: string | null = null;
  @Output() close = new EventEmitter<void>();

  @HostBinding('class.show') get showClass() {
    return !!this.imageUrl;
  }

  onClose(): void {
    this.imageUrl = null;
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }
}