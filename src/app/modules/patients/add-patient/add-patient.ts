import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientService, Patient } from '../patient.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient.html',
  styleUrls: ['./add-patient.css']  // fix typo here
})
export class AddPatient {
  fb = inject(FormBuilder);
  patientService = inject(PatientService);
  //toastr = inject(ToastrService);

  patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0)]],
    contactNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    medicalHistory: [''],
    emergencyContact: [''],
  });

  submit() {
    if (this.patientForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formValue = this.patientForm.value;

    const patient: Patient = {
      patientId: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstName: formValue.firstName ?? null,
      lastName: formValue.lastName ?? null,
      gender: formValue.gender ?? null,
      dateOfBirth: formValue.dateOfBirth ?? null,
      age: formValue.age !== null && formValue.age !== undefined ? Number(formValue.age) : null,  // convert string → number
      contactNumber: formValue.contactNumber ?? null,
      email: formValue.email ?? null,
      address: formValue.address ?? null,
      bloodGroup: formValue.bloodGroup ?? null,
      medicalHistory: formValue.medicalHistory ?? null,
      emergencyContact: formValue.emergencyContact ?? null,
    };

    this.patientService.addPatient(patient).subscribe({
      next: () => {
        alert('Patient added successfully');
        this.patientForm.reset();
      },
      error: () =>alert('Failed to add patient'),
    });
  }
}
