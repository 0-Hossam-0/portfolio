import { CommonModule } from "@angular/common";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
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
  private progressBarValue!: number;

  ngOnInit() {
    this.isLoading = this.dataService.isLoading;
    this.progress = this.dataService.progressBarValue;
    setInterval(() => {
      console.log(this.dataService.progressBarValue);
      this.isLoading = this.dataService.isLoading;
      this.progress = this.dataService.progressBarValue;
    }, 0);
  }

  // @HostListener("document:keydown", ["$event"])
  // handleKeyDown(event: KeyboardEvent) {
  //   if (event.key === "Escape") {
  //     this.dismissLoading();
  //   }
  // }

  // Dismiss loading screen
  // dismissLoading() {
  //   if (
  //     this.progress >= 100 ||
  //     confirm("Are you sure you want to skip loading?")
  //   ) {
  //     this.isLoading = false;
  //     if (this.progressInterval) {
  //       clearInterval(this.progressInterval);
  //     }
  //   }
  // }

  ngOnDestroy() {
  //   if (this.progressInterval) {
  //     clearInterval(this.progressInterval);
  //   }
  }
}
