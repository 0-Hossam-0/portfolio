import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ElementRef,
  Renderer2,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-image-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-modal.html",
  styleUrls: ["./image-modal.css"],
})
export class ImageModalComponent implements OnInit{
  ngOnInit(): void {
    document.onclick = (e) => {
      console.log(e.target);
    }
  }
  @Input() imageUrl: string | null = null;
  @Output() close = new EventEmitter<void>();

  zoom = 1;
  minZoom = 1;
  maxZoom = 3;
  zoomStep = 0.25;

  get isZoomed(): boolean {
    return this.zoom > 1;
  }

  onClose(): void {
    this.resetZoom();
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).classList.contains("modal-overlay") ||
      (event.target as HTMLElement).classList.contains("modal-content") ||
      (event.target as HTMLElement).classList.contains("image-wrapper")
    ) {
      this.onClose();
    }
  }

  onImageDoubleClick(): void {
    this.zoom = this.zoom > 1 ? 1 : 2;
  }

  zoomIn(): void {
    this.zoom = Math.min(this.maxZoom, +(this.zoom + this.zoomStep).toFixed(2));
  }

  zoomOut(): void {
    this.zoom = Math.max(this.minZoom, +(this.zoom - this.zoomStep).toFixed(2));
  }

  resetZoom(): void {
    this.zoom = 1;
  }

  onWheel(event: WheelEvent): void {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -this.zoomStep : this.zoomStep;
      this.zoom = Math.min(
        this.maxZoom,
        Math.max(this.minZoom, +(this.zoom + delta).toFixed(2))
      );
    }
  }
}
