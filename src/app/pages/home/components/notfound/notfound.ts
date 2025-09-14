import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../../services/animation';
import { ThemeService } from '../../../../services/theme';

@Component({
  selector: 'app-notfound',
  imports: [],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class NotFound {
  constructor(
    private router: Router,
    private animationService: AnimationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.animationService.initScrollAnimations();
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
