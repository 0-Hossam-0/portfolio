import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../../services/data";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loading.html",
  styleUrls: ["./loading.css"],
})
export class Loading implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}
  isLoading!: boolean;
  progress = 0;
  isFirstLoad: boolean = true;
  private progressInterval: any;

  ngOnInit() {
    this.isLoading = this.dataService.isLoading;
    this.progress = this.dataService.progressBarValue;
    this.isFirstLoad = this.dataService.isFirstLoad;
    this.progressInterval = setInterval(() => {
      this.isLoading = this.dataService.isLoading;
      this.progress = this.dataService.progressBarValue;
      this.isFirstLoad = this.dataService.isFirstLoad;
    }, 0);
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (this.isLoading && !this.isFirstLoad && event.key === 'Escape') this.dataService.cancelRequest();
  }

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    if (this.isLoading && !this.isFirstLoad) this.dataService.cancelRequest();
  }

  @HostListener("document:touchstart", ["$event"])
  onTouch(event: TouchEvent) {
    if (this.isLoading && !this.isFirstLoad) this.dataService.cancelRequest();
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}
