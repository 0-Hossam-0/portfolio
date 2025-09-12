import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService, IData } from '../../services/data';
import { ThemeService } from '../../services/theme';
import { Header } from '../home/components/header/header';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class UpdatePage {
  updateData!: IData['updates'][number];
  headerData!: {
    personalData: IData['personal'];
    contactData: IData['contact'];
  };
  @ViewChild('cardElement', { static: false }) cardElement!: ElementRef;

  currentImageIndex = 0;
  isVisible = false;
  isLoading = true;
  hasError = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.themeService.setupIntersectionObserver();
    this.themeService.initBackgroundAnimations();

    this.route.data.subscribe((data: any) => {
      if (data) {
        console.log('data');
        console.log(data);
        this.updateData = data.updateData.updateData ;
        this.headerData = {
          personalData: data.updateData.headerData.personal,
          contactData: data.updateData.headerData.contact,
        };
      }
      this.isLoading = false;
    });
  }
  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  onBackToPortfolio(): void {
    this.router.navigate(['/updates']);
  }

  onNextUpdate(): void {
    this.router.navigate(['/updates']);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.cardElement) {
      observer.observe(this.cardElement.nativeElement);
    }
  }

  startImageRotation(): void {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.updateData!.images.length;
    }, 4000);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }

  navigateToUpdate(): void {
    this.router.navigate(['/update', this.updateData!.title]);
  }

  onImageError(event: any): void {
    // Fallback to placeholder if image fails to load
    event.target.src = '/placeholder.svg?height=300&width=400';
  }

  nextImage() {
    if (this.updateData!.images.length > 1) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.updateData!.images.length;
    }
  }

  previousImage() {
    if (this.updateData!.images.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? this.updateData!.images.length - 1
          : this.currentImageIndex - 1;
    }
  }

  // formatDate(dateString: Date): string {
  //   console.log(dateString);
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   });
  // }
}
