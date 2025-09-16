import {
  Component,
  type OnInit,
  type AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimationService } from '../../../../services/animation';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../services/toast';
import { DataService } from '../../../../services/data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class Contact implements OnInit, AfterViewInit {
  @ViewChild('contactBg') contactBgRef!: ElementRef;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  constructor(
    private animationService: AnimationService,
    private dataService: DataService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animationService.createFloatingElements(
      this.contactBgRef.nativeElement,
      'contact'
    );
  }

  onSubmit(): void {
    this.dataService.sendEmail(this.formData).subscribe({
      next: () => {
        this.toastService.show('Email sent successfully!', 'success');
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: '',
        };
      },
      error: (error) => {
        if (error.status === 400) {
          return this.toastService.show('Invalid form provided', 'error');
        }
        this.toastService.show('Too many requests.', 'error');
      },
    });
  }
}
