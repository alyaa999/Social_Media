import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1InitialAccountComponent } from './step1-initial-account.component';

describe('Step1InitialAccountComponent', () => {
  let component: Step1InitialAccountComponent;
  let fixture: ComponentFixture<Step1InitialAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1InitialAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1InitialAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
