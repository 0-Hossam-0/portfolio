import { CommonModule } from '@angular/common';
import { Component, type OnInit, type OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { ThemeService } from '../../services/theme';
import { Header } from '../home/components/header/header';
import { IData } from '../../services/data';

interface IProjectData {
  project: IData['projects'][number];
  headerData: {
    contactData: IData['contact'];
    personalData: IData['personal'];
  };
}

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
  imports: [CommonModule, Header],
})
export class ProjectPage implements OnInit, OnDestroy {
  isLoading = true;
  hasError = false;
  projectData!: IProjectData['project'];
  headerData!: IProjectData['headerData'];
  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.themeService.setupIntersectionObserver();
    this.themeService.initBackgroundAnimations();

    this.route.data.subscribe({
      next: (data: any) => {
        if (data.projectData instanceof UrlTree) {
          this.router.navigateByUrl(data.projectData);
        } else if (
          data.projectData &&
          data.projectData.projectData &&
          data.projectData.headerData
        ) {
          this.projectData = data.projectData.projectData;
          this.headerData = {
            personalData: data.projectData.headerData.personal,
            contactData: data.projectData.headerData.contact,
          };
        } else {
          this.router.navigate(['/not-found']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Route data error:', err);
        this.router.navigate(['/not-found']);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {}

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  onBackToPortfolio(): void {
    this.router.navigate(['/projects']);
  }

  onNextProject(): void {
    this.router.navigate(['/projects']);
  }
}
