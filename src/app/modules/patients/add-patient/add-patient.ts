import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PatientService, Patient } from '../patient.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient.html',
})
export class AddPatient {
  fb = inject(FormBuilder);
  patientService = inject(PatientService);

  useDob: boolean = true; // default: DOB active

  patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: [{ value: '', disabled: false }, Validators.required],
    age: [
      { value: '', disabled: true },
      [Validators.required, Validators.min(0)],
    ],
    contactNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    medicalHistory: [''],
    emergencyContact: [''],
  });

  toggleDobAge() {
    this.useDob = !this.useDob;
    if (this.useDob) {
      this.patientForm.get('dateOfBirth')?.enable();
      this.patientForm.get('age')?.disable();
      this.patientForm.get('age')?.reset();
    } else {
      this.patientForm.get('age')?.enable();
      this.patientForm.get('dateOfBirth')?.disable();
      this.patientForm.get('dateOfBirth')?.reset();
    }
  }

  isInvalid(field: string) {
    const control = this.patientForm.get(field);
    return control && control.invalid && (control.touched || control.dirty);
  }

  clearAll() {
    this.patientForm.reset();
    this.useDob = true;
    this.patientForm.get('dateOfBirth')?.enable();
    this.patientForm.get('age')?.disable();
  }

  submit() {
    this.patientForm.markAllAsTouched(); // show validation errors

    if (this.patientForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const formValue = this.patientForm.getRawValue();
    const patient: Patient = {
      patientId: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstName: formValue.firstName ?? null,
      lastName: formValue.lastName ?? null,
      gender: formValue.gender ?? null,
      dateOfBirth: formValue.dateOfBirth ?? null,
      age: formValue.age !== null ? Number(formValue.age) : null,
      contactNumber: formValue.contactNumber ?? null,
      email: formValue.email ?? null,
      address: formValue.address ?? null,
      bloodGroup: formValue.bloodGroup ?? null,
      medicalHistory: formValue.medicalHistory ?? null,
      emergencyContact: formValue.emergencyContact ?? null,
    };

    this.patientService.addPatient(patient).subscribe({
      next: () => {
        alert('Patient added successfully!');
        this.patientForm.reset();
        if (this.useDob) {
          this.patientForm.get('age')?.disable();
        } else {
          this.patientForm.get('dateOfBirth')?.disable();
        }
      },
      error: () => alert('Failed to add patient'),
    });
  }
}
