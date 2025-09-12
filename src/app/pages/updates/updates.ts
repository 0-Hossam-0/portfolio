import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IData } from '../../services/data';
import { Header } from '../home/components/header/header';
import { Footer } from '../home/components/footer/footer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.html',
  styleUrls: ['./updates.css'],
  standalone: true,
  imports: [CommonModule, Header, Footer],
})
export class Updates implements OnInit {
  allData!: IData;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.allData = this.route.snapshot.data['allData'];
  }
  onUpdateClick(update: IData['updates'][0]): void {
    const urlTitle = update.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    this.router.navigate(['/update', urlTitle]);
  }
}
