import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMain } from './patient-main';

describe('PatientMain', () => {
  let component: PatientMain;
  let fixture: ComponentFixture<PatientMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
