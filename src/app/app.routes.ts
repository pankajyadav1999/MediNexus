import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./modules/patients/patients.routes').then(m => m.PATIENTS_ROUTES)
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./modules/doctors/doctors.routes').then(m => m.DOCTORS_ROUTES)
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./modules/appointments/appointments.routes').then(m => m.APPOINTMENTS_ROUTES)
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./modules/billing/billing.routes').then(m => m.BILLING_ROUTES)
      },
      {
        path: 'pharmacy',
        loadChildren: () =>
          import('./modules/pharmacy/pharmacy.routes').then(m => m.PHARMACY_ROUTES)
      },
      {
        path: 'lab',
        loadChildren: () =>
          import('./modules/lab/lab.routes').then(m => m.LAB_ROUTES)
      },
      {
        path: 'ward',
        loadChildren: () =>
          import('./modules/ward/ward.routes').then(m => m.WARD_ROUTES)
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/reports/reports.routes').then(m => m.REPORTS_ROUTES)
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./modules/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
