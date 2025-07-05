import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword = false;
  isLoading = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Add loading state
    this.isLoading = true;
    
    // Simulate login process
    setTimeout(() => {
      this.isLoading = false;
      
      // Here you would typically handle the actual login
      alert('Login functionality would be implemented here!');
    }, 2000);
  }

  onInputFocus(event: Event): void {
    const input = event.target as HTMLElement;
    const parent = input.parentElement;
    if (parent) {
      parent.style.transform = 'scale(1.02)';
    }
  }

  onInputBlur(event: Event): void {
    const input = event.target as HTMLElement;
    const parent = input.parentElement;
    if (parent) {
      parent.style.transform = 'scale(1)';
    }
  }

  onSocialButtonEnter(event: Event): void {
    const btn = event.target as HTMLElement;
    btn.style.boxShadow = '0 10px 30px rgba(228, 41, 30, 0.2)';
  }

  onSocialButtonLeave(event: Event): void {
    const btn = event.target as HTMLElement;
    btn.style.boxShadow = 'none';
  }

  onBackLinkClick(event: Event): void {
    event.preventDefault();
    // Add smooth transition effect
    document.body.style.opacity = '0';
    setTimeout(() => {
      // Navigate back or redirect
      window.history.back();
    }, 300);
  }
}