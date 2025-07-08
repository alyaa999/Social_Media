import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2ProfileInfoComponent } from './step2-profile-info.component';

describe('Step2ProfileInfoComponent', () => {
  let component: Step2ProfileInfoComponent;
  let fixture: ComponentFixture<Step2ProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2ProfileInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
