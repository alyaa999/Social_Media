import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileAggregation } from '../../../Interfaces/Profile/profile-aggrigation';

@Component({
  selector: 'app-follow-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './follow-modal.component.html',
  styleUrl: './follow-modal.component.css'
})
export class FollowModalComponent {
  @Input() users: ProfileAggregation[] = [];
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
