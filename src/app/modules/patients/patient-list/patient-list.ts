import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Pencil, Trash2 } from 'lucide';
import { PatientService, Patient } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css'],
})
export class PatientList implements OnInit {
  private patientService = inject(PatientService);

  patients: Patient[] = [];
  loading: boolean = true;

  pencil = Pencil;
  trash = Trash2;

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.loading = true;
    this.patients = [];
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data || [];
        this.loading = false;
      },
      error: () => {
        this.patients = [];
        this.loading = false;
      },
    });
  }

  editPatient(patient: Patient) {
    console.log('Edit', patient);
  }

  deletePatient(patient: Patient) {
    console.log('Delete', patient);
  }
}
