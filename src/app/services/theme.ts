import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean): void {
    ctx.fillStyle = isDark
      ? 'rgba(37, 99, 235, 0.6)'
      : 'rgba(59, 130, 246, 0.4)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(true);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  private observer!: IntersectionObserver;
  private particles: Particle[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;

  constructor() {
    this.loadThemePreference();
    this.applyTheme();
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  set isDarkMode(value: boolean) {
    this.isDarkModeSubject.next(value);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveThemePreference();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveThemePreference();
    // Update particle colors when theme changes
    if (this.particles.length > 0) {
      this.particles.forEach((particle) => {
        particle.update(this.canvas.width, this.canvas.height);
      });
    }
  }

  loadThemePreference(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Default to system preference
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
    }
  }

  saveThemePreference(): void {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme(): void {
    const html = document.documentElement;
    if (this.isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  setupIntersectionObserver(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe elements after view init
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        this.observer.observe(el);
      });
    }, 100);
  }

  initBackgroundAnimations(): void {
    setTimeout(() => {
      this.setupParticleSystem();
      this.animate();
    }, 100);
  }

  private setupParticleSystem(): void {
    this.canvas = document.getElementById(
      'particle-canvas'
    ) as HTMLCanvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();

    // Create particles
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private animate(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle) => {
      particle.update(this.canvas.width, this.canvas.height);
      particle.draw(this.ctx, this.isDarkMode);
    });

    // Draw connections between nearby particles
    this.drawConnections();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = 0.2 * (1 - distance / 100);
          this.ctx.strokeStyle = this.isDarkMode
            ? `rgba(37, 99, 235, ${opacity})`
            : `rgba(59, 130, 246, ${opacity * 0.7})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
}
