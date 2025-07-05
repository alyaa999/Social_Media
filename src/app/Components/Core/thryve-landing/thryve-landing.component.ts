import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-thryve-landing',
  templateUrl:'./thryve-landing.component.html',
  styleUrls: ['./thryve-landing.component.scss'],
})
export class ThryveLandingComponent implements OnInit, AfterViewInit {
  @ViewChild('changingWord') changingWord!: ElementRef;

  ngOnInit(): void {
    this.setupSmoothScrolling();
  }

  ngAfterViewInit(): void {
    this.setupStatsObserver();
  }

  private setupSmoothScrolling(): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  private setupStatsObserver(): void {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Observe all stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
      observer.observe(item);
    });
  }
}