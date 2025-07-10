import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4CustomizeProfileComponent } from './step4-customize-profile.component';

describe('Step4CustomizeProfileComponent', () => {
  let component: Step4CustomizeProfileComponent;
  let fixture: ComponentFixture<Step4CustomizeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step4CustomizeProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4CustomizeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
