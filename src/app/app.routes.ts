import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  // Auth module (login/signup)
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
      }
    ]
  },

  // Main Layout (protected)
  {
    path: '',
    component: MainLayout,
    children: [
      // Dashboard
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },

      // Patients module
      {
        path: 'patients',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/patients/patients.routes').then(m => m.PATIENTS_ROUTES)
      },

      // Doctors module
      {
        path: 'doctors',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/doctors/doctors.routes').then(m => m.DOCTORS_ROUTES)
      },

      // Appointments module
      {
        path: 'appointments',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/appointments/appointments.routes').then(m => m.APPOINTMENTS_ROUTES)
      },

      // Billing module
      {
        path: 'billing',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/billing/billing.routes').then(m => m.BILLING_ROUTES)
      },

      // Pharmacy module
      {
        path: 'pharmacy',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/pharmacy/pharmacy.routes').then(m => m.PHARMACY_ROUTES)
      },

      // Lab module
      {
        path: 'lab',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/lab/lab.routes').then(m => m.LAB_ROUTES)
      },

      // Ward module
      {
        path: 'ward',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/ward/ward.routes').then(m => m.WARD_ROUTES)
      },

      // Reports module
      {
        path: 'reports',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/reports/reports.routes').then(m => m.REPORTS_ROUTES)
      },

      // Inventory module
      {
        path: 'inventory',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES)
      },

      // Default redirect → login
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      }
    ]
  },

  // Fallback route → redirect to login
  {
    path: '**',
    redirectTo: 'auth'
  }
];
