import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { LoginRequest } from '../../../Interfaces/Auth/LoginRequest';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage = null;
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    this.isLoading = true;
    const loginRequest: LoginRequest = { email, password };
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.isLoading = false;
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'invalid username or password';
      }
    });
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