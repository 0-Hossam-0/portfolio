import {
  Component,
  type OnInit,
  type AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AnimationService } from '../../../../services/animation';
import { CommonModule } from '@angular/common';
import { IData } from '../../../../services/data';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class Portfolio implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('portfolioBg') portfolioBgRef!: ElementRef;
  @Input({ required: true }) portfolioData!: IData['projects'];
  limitedPortfolioData!: IData['projects'];

  constructor(
    private animationService: AnimationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['portfolioData'] && this.portfolioData) {
      this.limitedPortfolioData = this.portfolioData.slice(0, 4);
    }
  }

  ngAfterViewInit(): void {
    this.animationService.createFloatingElements(
      this.portfolioBgRef.nativeElement,
      'portfolio'
    );
  }

  onProjectClick(project: IData['projects'][0]): void {
    // Convert project title to URL-friendly format
    const urlTitle = project.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    this.router.navigate(['/project', urlTitle]);
  }
}
