import { Routes } from '@angular/router';
import { PatientMain } from './patient-main/patient-main';
import { AddPatient } from './add-patient/add-patient';
import { PatientList } from './patient-list/patient-list';
import { ViewPatients } from './view-patients/view-patients';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    component: PatientMain,
    children:[
      { path: 'add-patient', component: AddPatient },
      { path: 'patient-list', component: PatientList },
      { path: 'view-patients', component: ViewPatients },
      { path: '', redirectTo: 'patient-list', pathMatch: 'full' }
    ]
  }
];
