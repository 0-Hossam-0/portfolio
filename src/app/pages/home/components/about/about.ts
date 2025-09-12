import {
  Component,
  type OnInit,
  type AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { AnimationService } from '../../../../services/animation';
import { IData } from '../../../../services/data';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit, AfterViewInit {
  private _aboutData!: {
    personalData: IData['personal'];
    contactData: IData['contact'];
  };
  @ViewChild('aboutBg') aboutBgRef!: ElementRef;
  @Input({ required: true })
  set aboutData(value: {
    personalData: IData['personal'];
    contactData: IData['contact'];
  }) {
    this._aboutData = value;
  }
  get aboutData(): {
    personalData: IData['personal'];
    contactData: IData['contact'];
  } {
    return this._aboutData;
  }
  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animationService.createFloatingElements(
      this.aboutBgRef.nativeElement,
      'about'
    );
  }
}
