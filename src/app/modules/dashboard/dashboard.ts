import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedStatusChart } from './bed-status-chart/bed-status-chart';


interface BedStatus {
  type: string;
  available: number;
  total: number;
}

interface Patient {
  name: string;
  status: string;
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
  imports: [CommonModule,BedStatusChart],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  beds: BedStatus[] = [
    { type: 'ICU Beds', available: 3, total: 10 },
    { type: 'General Ward', available: 20, total: 30 }
  ];

  recentPatients: Patient[] = [
    { name: 'John Doe', status: 'OPD' },
    { name: 'Jane Smith', status: 'Admitted' }
  ];

  doctorsOnDuty: Doctor[] = [
    { name: 'Dr. Raj', department: 'Cardiology' },
    { name: 'Dr. Khan', department: 'Orthopedics' }
  ];

  todaysAppointments: Appointment[] = [
    { patient: 'John Doe', doctor: 'Dr. Raj', time: '10:00 AM', date: '08/06/2025', day: 'Sunday' },
    { patient: 'Jane Smith', doctor: 'Dr. Khan', time: '11:00 AM', date: '08/06/2025', day: 'Sunday' }
  ];
}
