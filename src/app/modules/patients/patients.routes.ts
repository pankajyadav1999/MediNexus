import { Routes } from '@angular/router';
import { PatientList } from './patient-list/patient-list';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    component: PatientList
  }
];
