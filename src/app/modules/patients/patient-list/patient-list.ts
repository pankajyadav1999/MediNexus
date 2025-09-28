import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService, Patient } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css'],
})
export class PatientList implements OnInit {
  patientService = inject(PatientService);

  patients: Patient[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
