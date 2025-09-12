import {
  Component,
  type OnInit,
  type AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IData } from '../../services/data';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../home/components/header/header';
import { Footer } from '../home/components/footer/footer';
import { Github, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
  imports: [CommonModule, Header, Footer, LucideAngularModule],
})
export class ProjectsPage implements OnInit, AfterViewInit {
  selectedCategory = 'All';
  allData!: IData;
  githubIcon = Github;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.allData = this.route.snapshot.data['allData'];
  }

  ngAfterViewInit(): void {
    const backgroundContainer = document.getElementById('projectsBackground');
    if (backgroundContainer) {
    }
  }

  onProjectClick(project: IData['projects'][0]): void {
    const urlTitle = project.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    this.router.navigate(['/project', urlTitle]);
  }
}
