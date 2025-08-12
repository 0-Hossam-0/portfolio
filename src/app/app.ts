import { Component, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme';
import { Toast } from './public components/toast/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, Toast, CommonModule],
  standalone: true,
})
export class App implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}
}
