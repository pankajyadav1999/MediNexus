import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedStatusChart } from './bed-status-chart/bed-status-chart';
import { PatientService, Patient as PatientModel } from '../patients/patient.service';

interface BedStatus {
  type: string;
  available: number;
  total: number;
}

interface Doctor {
  name: string;
  department: string;
}

interface Appointment {
  patient: string;
  doctor: string;
  time: string;
  date: string;
  day: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BedStatusChart],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private patientService = inject(PatientService);

  beds: BedStatus[] = [
    { type: 'ICU Beds', available: 3, total: 10 },
    { type: 'General Ward', available: 20, total: 30 }
  ];

  recentPatients: PatientModel[] = [];
  loadingPatients: boolean = true;

  doctorsOnDuty: Doctor[] = [
    { name: 'Dr. Raj', department: 'Cardiology' },
    { name: 'Dr. Khan', department: 'Orthopedics' }
  ];

  todaysAppointments: Appointment[] = [
    { patient: 'John Doe', doctor: 'Dr. Raj', time: '10:00 AM', date: '08/06/2025', day: 'Sunday' },
    { patient: 'Jane Smith', doctor: 'Dr. Khan', time: '11:00 AM', date: '08/06/2025', day: 'Sunday' }
  ];

  ngOnInit() {
    this.loadRecentPatients();
  }

  loadRecentPatients() {
    this.loadingPatients = true;
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.recentPatients = data || [];
        this.loadingPatients = false;
      },
      error: () => {
        this.recentPatients = [];
        this.loadingPatients = false;
      }
    });
  }
}
