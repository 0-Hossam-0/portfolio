import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private activeSection = new BehaviorSubject<string>('home');
  public activeSection$ = this.activeSection.asObservable();

  private isNavigating = false;

  setActiveSection(section: string): void {
    this.activeSection.next(section);
  }

  smoothScrollToSection(targetId: string): void {
    if (this.isNavigating) return;
    
    this.isNavigating = true;
    const targetElement = document.querySelector(targetId);
    
    if (!targetElement) {
      this.isNavigating = false;
      return;
    }

    const headerHeight = 80;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start: number | null = null;

    const smoothScroll = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      window.scrollTo(0, startPosition + distance * easeOut);

      if (progress < duration) {
        requestAnimationFrame(smoothScroll);
      } else {
        this.isNavigating = false;
      }
    };

    requestAnimationFrame(smoothScroll);
  }

  initScrollListener(): void {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (this.isNavigating || ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const sections = document.querySelectorAll('section[id]');
        let current = 'home'; // Default to home
        
        // Check which section is currently in view
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          
          // Consider a section active if it's in the upper portion of the viewport
          if (sectionTop <= 200 && sectionTop + sectionHeight > 200) {
            current = section.getAttribute('id') || 'home';
          }
        });
        
        // Special handling for when at the very top
        if (window.scrollY < 100) {
          current = 'home';
        }
        
        // Special handling for when at the very bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
          const lastSection = sections[sections.length - 1];
          current = lastSection?.getAttribute('id') || 'contact';
        }
        
        if (current && current !== this.activeSection.value) {
          this.setActiveSection(current);
        }
        
        ticking = false;
      });
    });
  }
}
