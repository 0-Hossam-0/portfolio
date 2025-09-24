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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class Blog implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('blogBg') blogBgRef!: ElementRef;
  @Input({ required: true }) updatesData!: IData['updates'];
  limitedUpdatesData!: IData['updates'];

  constructor(private animationService: AnimationService) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updatesData'] && this.updatesData) {
      this.limitedUpdatesData = this.updatesData.slice(0, 3);
    }
  }

  ngAfterViewInit(): void {
    this.animationService.createFloatingElements(
      this.blogBgRef.nativeElement,
      'blog'
    );
  }
}
