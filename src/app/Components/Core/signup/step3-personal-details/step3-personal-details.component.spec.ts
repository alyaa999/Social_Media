import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3PersonalDetailsComponent } from './step3-personal-details.component';

describe('Step3PersonalDetailsComponent', () => {
  let component: Step3PersonalDetailsComponent;
  let fixture: ComponentFixture<Step3PersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3PersonalDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3PersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
