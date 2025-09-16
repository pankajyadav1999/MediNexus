import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartType } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-bed-status-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bed-status-chart.html',
  styleUrls: ['./bed-status-chart.css']
})
export class BedStatusChart implements AfterViewInit {

  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    // Doughnut Chart
    new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut' as ChartType,
      data: {
        labels: ['ICU', 'General', 'Private'],
        datasets: [{
          data: [5, 10, 3],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Bed Status (Doughnut)' } }
      }
    });

   // Line Chart
    new Chart(this.lineCanvas.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [{
          label: 'Patient Visits',
          data: [3, 6, 4, 7, 5],
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true, plugins: { title: { display: true, text: 'Patient Visits (Line)' } } }
    });

  }
}
