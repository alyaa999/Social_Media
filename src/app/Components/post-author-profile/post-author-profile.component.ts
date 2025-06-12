import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-author-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-author-profile.component.html'
})
export class PostAuthorProfileComponent {
  @Input() authorName: string = '';
  @Input() authorRole: string = '';
  @Input() authorImage: string = '';
} 