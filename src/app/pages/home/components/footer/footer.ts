import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnimationService } from '../../../../services/animation';
import { ScrollService } from '../../../../services/scroll';
import { FormsModule } from '@angular/forms';
import { IData } from '../../../../services/data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  imports: [CommonModule, FormsModule],
})
export class Footer {
  @ViewChild('footerBg') footerBgRef!: ElementRef;
  private _footerData!: IData;
  @Input({ required: true })
  set footerData(value: IData) {
    this._footerData = value;
    console.log('updates', this._footerData);
  }
  get footerData(): IData {
    return this._footerData;
  }

  currentYear = new Date().getFullYear();
  showBackToTop = false;
  newsletterEmail = '';

  private scrollListener?: () => void;

  constructor(
    private animationService: AnimationService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.initScrollListener();
  }

  ngAfterViewInit(): void {
    this.createEnhancedFooterAnimation();
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private initScrollListener(): void {
    this.scrollListener = () => {
      this.showBackToTop = window.pageYOffset > 300;
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  private createEnhancedFooterAnimation(): void {
    if (!this.footerBgRef?.nativeElement) return;

    const container = this.footerBgRef.nativeElement;
    container.innerHTML = '';

    const gridBg = document.createElement('div');
    gridBg.className = 'footer-grid-bg';
    container.appendChild(gridBg);

    const shapes = ['◆', '●', '▲', '■', '★', '◇', '◯', '△', '◈', '◐'];

    for (let i = 0; i < 15; i++) {
      const element = document.createElement('div');
      element.className = 'floating-footer-element';
      element.textContent = shapes[Math.floor(Math.random() * shapes.length)];

      const size = Math.random() * 25 + 15;
      element.style.fontSize = size + 'px';
      element.style.left = Math.random() * 100 + '%';
      element.style.color = `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.1})`;
      element.style.animationDuration = Math.random() * 25 + 35 + 's';
      element.style.animationDelay = Math.random() * 20 + 's';
      element.style.transform = `rotate(${Math.random() * 360}deg)`;

      container.appendChild(element);
    }

    for (let i = 0; i < 8; i++) {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';

      const size = Math.random() * 40 + 20;
      orb.style.width = size + 'px';
      orb.style.height = size + 'px';
      orb.style.left = Math.random() * 100 + '%';
      orb.style.top = Math.random() * 100 + '%';
      orb.style.animationDuration = Math.random() * 8 + 12 + 's';
      orb.style.animationDelay = Math.random() * 10 + 's';

      container.appendChild(orb);
    }

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 15 + 20 + 's';
      particle.style.animationDelay = Math.random() * 15 + 's';

      container.appendChild(particle);
    }

    // Create floating lines
    for (let i = 0; i < 6; i++) {
      const line = document.createElement('div');
      line.className = 'floating-line';
      line.style.left = Math.random() * 80 + '%';
      line.style.top = Math.random() * 100 + '%';
      line.style.animationDuration = Math.random() * 12 + 18 + 's';
      line.style.animationDelay = Math.random() * 10 + 's';
      line.style.transform = `rotate(${Math.random() * 180}deg)`;

      container.appendChild(line);
    }

    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div');
      dot.className = 'floating-footer-element';
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.background = `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.2})`;
      dot.style.borderRadius = '50%';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.animationDuration = Math.random() * 20 + 25 + 's';
      dot.style.animationDelay = Math.random() * 15 + 's';
      dot.style.boxShadow = `0 0 10px rgba(37, 99, 235, 0.3)`;

      container.appendChild(dot);
    }

    const codeSymbols = [
      '{ }',
      '< >',
      '[ ]',
      '( )',
      '/>',
      '&&',
      '||',
      '=>',
      '++',
      '--',
    ];

    for (let i = 0; i < 8; i++) {
      const symbol = document.createElement('div');
      symbol.className = 'floating-footer-element';
      symbol.textContent =
        codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
      symbol.style.fontFamily = 'Monaco, Consolas, "Courier New", monospace';
      symbol.style.fontSize = Math.random() * 8 + 12 + 'px';
      symbol.style.left = Math.random() * 100 + '%';
      symbol.style.color = `rgba(37, 99, 235, ${Math.random() * 0.15 + 0.1})`;
      symbol.style.animationDuration = Math.random() * 30 + 40 + 's';
      symbol.style.animationDelay = Math.random() * 25 + 's';
      symbol.style.fontWeight = '600';

      container.appendChild(symbol);
    }
  }

  scrollToTop(): void {
    this.scrollService.smoothScrollToSection('#home');
  }

  onNewsletterSubmit(): void {
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      console.log('Newsletter subscription:', this.newsletterEmail);

      this.showSuccessMessage('Thank you for subscribing to our newsletter!');

      this.newsletterEmail = '';
    } else {
      this.showErrorMessage('Please enter a valid email address.');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showSuccessMessage(message: string): void {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 10000;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  private showErrorMessage(message: string): void {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
      z-index: 10000;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  navigateToSection(sectionId: string): void {
    this.scrollService.smoothScrollToSection(sectionId);
  }
}
