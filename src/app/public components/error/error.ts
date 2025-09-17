import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { LucideAngularModule, RotateCw } from "lucide-angular";
import { Subscription } from "rxjs";
import {
  allData$,
  hasError$,
  isFirstLoad$,
  loadingStatus$,
} from "../../events/events";
import { DataService } from "../../services/data";

@Component({
  selector: "app-error",
  templateUrl: "./error.html",
  styleUrls: ["./error.css"],
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CommonModule],
})
export class Error implements AfterViewInit, OnDestroy, OnInit {
  hasError: boolean = false;
  title = "Network Error";
  message = "We had trouble loading your data. We will retry shortly.";
  details?: string | null = null;
  retryCount: number = -1;
  readonly maxRetries: number = 3;
  get isMaxRetriesReached(): boolean {
    return this.retryCount >= this.maxRetries;
  }
  countdownStart = 5;
  autoRetry = true;

  @ViewChild("primaryButton", { static: true })
  primaryBtn!: ElementRef<HTMLButtonElement>;

  countdown = this.countdownStart;
  progressPercent = 0;
  reconnecting = false;
  visible = true;
  readonly reloadIcon = RotateCw;
  private intervalId: any = null;
  private smoothTimerId: any = null;
  private startTimestamp = 0;
  private sub!: Subscription;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.sub = loadingStatus$.subscribe((value) => {
      this.hasError = value.status === "error";
      if (this.hasError) {
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          this.startCountdown();
        } else {
          this.message =
            "Maximum retry attempts reached. Please try again later or contact support.";
          this.clearTimers();
        }
      } else {
        this.clearTimers();
        this.reconnecting = false;
        this.retryCount = 0;
      }
    });
  }

  onRetry() {
    if (this.retryCount >= this.maxRetries) {
      return;
    }
    this.hasError = false;
    this.dataService.fetchWithProgress().subscribe({
      next: (data) => {
        this.hasError = loadingStatus$.getValue().status === "error";
        if (!this.hasError) {
          isFirstLoad$.next(true);
          this.retryCount = 0;
        }
        allData$.next(data);
      },
      error: (err) => {
        isFirstLoad$.next(true);
        this.hasError = true;
        hasError$.next(true);
      },
    });
  }

  ngAfterViewInit(): void {
    try {
      this.primaryBtn?.nativeElement?.focus();
    } catch {}
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private startCountdown() {
    this.clearTimers();
    this.countdown = this.countdownStart;
    this.progressPercent = 0;
    if (!this.autoRetry) return;
    this.reconnecting = true;
    this.startTimestamp = performance.now();
    const totalMs = this.countdownStart * 1000;
    this.smoothTimerId = setInterval(() => {
      const elapsed = performance.now() - this.startTimestamp;
      this.progressPercent = Math.min(100, (elapsed / totalMs) * 100);
    }, 80);
    this.intervalId = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        this.doAutoRetry();
      }
    }, 1000);
  }

  private doAutoRetry() {
    this.clearTimers();
    this.progressPercent = 100;
    this.reconnecting = false;
    this.onRetry();
  }

  retryNow() {
    if (this.retryCount >= this.maxRetries) {
      return;
    }
    this.reconnecting = true;
    this.clearTimers();
    this.onRetry();
  }

  private clearTimers() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.smoothTimerId) {
      clearInterval(this.smoothTimerId);
      this.smoothTimerId = null;
    }
  }
}
