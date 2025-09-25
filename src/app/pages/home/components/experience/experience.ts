import {
  Component,
  type OnInit,
  type AfterViewInit,
  type ElementRef,
  ViewChild,
  Input,
} from "@angular/core";
import { AnimationService } from "../../../../services/animation";
import { IData } from "../../../../services/data";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.html",
  styleUrls: ["./experience.css"],
  standalone: true,
  imports: [CommonModule],
})
export class Experience implements AfterViewInit {
  @ViewChild("experienceBg") experienceBgRef!: ElementRef;
  private _experienceData!: IData["experiences"];

  @Input({ required: true })
  set experienceData(value: IData["experiences"]) {
    if (value) {
      this._experienceData = [...value].sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
      });
    }
  }
  get experienceData(): IData["experiences"] {
    return this._experienceData;
  }

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit(): void {
    if (this.experienceData && this.experienceData.length > 0) {
      this.initializeAnimations();
    }
  }

  private initializeAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
      });

      if (this.experienceBgRef?.nativeElement) {
        this.animationService.createExperienceCodeAnimation(
          this.experienceBgRef.nativeElement
        );
      }
    }, 0);
  }

  getCompletionLabel(date: string | Date | "Present"): string {
    if (date === "Present" || !date) return "Present";
    const year = new Date(date).getFullYear();
    const currentYear = new Date().getFullYear();
    return year === currentYear ? "Present" : year.toString();
  }
}
