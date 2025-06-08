import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ward } from './ward';

describe('Ward', () => {
  let component: Ward;
  let fixture: ComponentFixture<Ward>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ward]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ward);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
