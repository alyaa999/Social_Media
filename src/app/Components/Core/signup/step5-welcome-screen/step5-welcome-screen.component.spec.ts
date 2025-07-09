import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step5WelcomeScreenComponent } from './step5-welcome-screen.component';

describe('Step5WelcomeScreenComponent', () => {
  let component: Step5WelcomeScreenComponent;
  let fixture: ComponentFixture<Step5WelcomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step5WelcomeScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step5WelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
