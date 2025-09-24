import { CommonModule } from "@angular/common";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../../services/data";
import { Router } from "@angular/router";
import { isFirstLoad$, loadingStatus$ } from "../../events/events";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loading.html",
  styleUrls: ["./loading.css"],
})
export class Loading implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}
  isLoading: boolean = false;
  progress = 0;
  isFirstLoad: boolean = true;
  private progressInterval: any;

  ngOnInit() {
    this.isFirstLoad = isFirstLoad$.getValue();
    this.isLoading = loadingStatus$.getValue().isLoading;
    loadingStatus$.subscribe((loadingStatus) => {
      this.isLoading = loadingStatus.isLoading;
      let fakeInterval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += 5;
        } else if (
          loadingStatus$.getValue().status === "success" &&
          this.progress === 90
        )
          this.progress = 100;
        else {
          clearInterval(fakeInterval);
          this.progress = 0;
        }
      }, 100);
    });
    isFirstLoad$.subscribe((value) => {
      this.isFirstLoad = value;
    });
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (this.isLoading && !this.isFirstLoad && event.key === "Escape")
      this.dataService.cancelRequest();
  }

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (this.isLoading && !this.isFirstLoad && element.id === "loading-screen")
      this.dataService.cancelRequest();
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
