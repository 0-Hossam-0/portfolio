import {
  Component,
  type OnInit,
  type AfterViewInit,
  type ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { AnimationService } from '../../../../services/animation';
import { IData } from '../../../../services/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
  imports:[CommonModule]
})
export class Experience implements OnInit, AfterViewInit {
  @ViewChild('experienceBg') experienceBgRef!: ElementRef;
  private _experienceData!: IData['experiences'];
  @Input({ required: true })
  set experienceData(value: IData['experiences']) {
    this._experienceData = value;
  }
  get experienceData(): IData['experiences'] {
    return this._experienceData;
  }
  constructor(private animationService: AnimationService) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createEnhancedExperienceAnimation();

    this.initializeSkillAnimations();

    this.initializeTimelineAnimations();

    this.initializeScrollAnimations();
  }

  private createEnhancedExperienceAnimation(): void {
    if (!this.experienceBgRef?.nativeElement) return;

    this.animationService.createExperienceCodeAnimation(
      this.experienceBgRef.nativeElement
    );
  }

  getCompletionLabel(date: Date): string {
    if (!date) return 'Present';
    const dateString = date.toString();
    const year = new Date(dateString).getFullYear();
    const currentYear = new Date().getFullYear();
    return year === currentYear ? 'Present' : year.toString();
  }

  private initializeSkillAnimations(): void {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateSkills();
            skillObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    setTimeout(() => {
      const skillsSection = document.querySelector('.skills-grid');
      if (skillsSection) {
        skillObserver.observe(skillsSection);
      }
    }, 100);
  }

  private initializeTimelineAnimations(): void {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-timeline');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item) => {
        timelineObserver.observe(item);
      });
    }, 100);
  }

  private initializeScrollAnimations(): void {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((element) => {
        scrollObserver.observe(element);
      });
    }, 100);
  }

  private animateSkills(): void {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
      const progressBar = card.querySelector(
        '.skill-progress-bar'
      ) as HTMLElement;
      const percentage = card.getAttribute('data-skill');

      if (progressBar && percentage) {
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';

        setTimeout(() => {
          card.classList.add('skill-animate-in');
        }, index * 100);

        setTimeout(() => {
          progressBar.style.transition =
            'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
          progressBar.style.width = percentage + '%';

          progressBar.classList.add('progress-animating');

          setTimeout(() => {
            progressBar.classList.remove('progress-animating');
          }, 2000);
        }, 200 + index * 150);

        this.animateCounter(card, parseInt(percentage));
      }
    });
  }

  private animateCounter(card: Element, targetValue: number): void {
    const percentageElement = card.querySelector(
      '.skill-percentage'
    ) as HTMLElement;
    if (!percentageElement) return;

    let currentValue = 0;
    const increment = targetValue / 60;
    const duration = 2000;
    const frameTime = duration / 60;

    const updateCounter = () => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        percentageElement.textContent = Math.round(currentValue) + '%';
        return;
      }

      percentageElement.textContent = Math.round(currentValue) + '%';
      setTimeout(updateCounter, frameTime);
    };

    setTimeout(updateCounter, 200);
  }
}
