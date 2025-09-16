import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedStatusChart } from './bed-status-chart';

describe('BedStatusChart', () => {
  let component: BedStatusChart;
  let fixture: ComponentFixture<BedStatusChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedStatusChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedStatusChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
