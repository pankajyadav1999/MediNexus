import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  patientId: number;
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  age?: number | null;
  contactNumber?: string | null;
  email?: string | null;
  address?: string | null;
  bloodGroup?: string | null;
  medicalHistory?: string | null;
  emergencyContact?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:5044/api/Patient';

  constructor(private http: HttpClient) {}

  addPatient(patient: Patient): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddPatient`, patient);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/GetPatient`);
  }
}
