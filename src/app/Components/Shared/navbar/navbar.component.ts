import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { Router } from '@angular/router';
import { ProfileService } from '../../../Services/profile.service';
import { SimpleUserProfile } from '../../../Interfaces/Profile/simple-user-profile';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationModalComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isNotificationOpen = false;
  searchResults: SimpleUserProfile[] = [];
  searchSubject = new Subject<string>();
  searchQuery: string = '';
  userCache = new Map<string, SimpleUserProfile>();

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query.trim() === '') {
          return [];
        }
        return this.profileService.searchProfiles(query);
      })
    ).subscribe(response => {
      const newUsers = response.data || [];
      newUsers.forEach(user => {
        if (!this.userCache.has(user.userId)) {
          this.userCache.set(user.userId, user);
        }
      });
      this.filterResults(this.searchQuery);
    });
  }

  onSearch(event: any): void {
    const query = event.target.value;
    this.searchQuery = query;
    this.filterResults(query);
    this.searchSubject.next(query);
  }

  filterResults(query: string): void {
    if (query.trim() === '') {
      this.searchResults = [];
      return;
    }
    const cachedUsers = Array.from(this.userCache.values());
    this.searchResults = cachedUsers.filter(user =>
      (user.userName && user.userName.toLowerCase().includes(query.toLowerCase())) ||
      (user.displayName && user.displayName.toLowerCase().includes(query.toLowerCase()))
    );
  }

  navigateToUserProfile(userId: string): void {
    this.router.navigate(['/other', userId]);
    this.searchResults = [];
    this.searchQuery = '';
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  closeNotifications() {
    this.isNotificationOpen = false;
  }

  navigateToFeed() {
    this.router.navigate(['/feed']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
