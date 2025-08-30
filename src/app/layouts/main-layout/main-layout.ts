import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../modules/dashboard/dashboard';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout {
  showDashboard = true;
  searchText: string = '';
  filteredSidebar: any[] = [];

  sidebarItems = [
    { name: 'Dashboard', link: '/dashboard', parent: null },
    { name: 'Patients', link: '', parent: null, children: [
        { name: 'Patient List', link: '/patients/patient-list' },
        { name: 'Add Patient', link: '/patients/add-patient' },
        { name: 'View Patients', link: '/patients/view-patients' },
      ] 
    },
    { name: 'Doctors', link: '/doctors', parent: null },
    { name: 'Appointments', link: '/appointments', parent: null },
    { name: 'Billing', link: '/billing', parent: null },
    { name: 'Inventory', link: '/inventory', parent: null },
  ];

  constructor(private router: Router) {
    this.filteredSidebar = this.sidebarItems; // Initially all items visible

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showDashboard = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/dashboard';
      });
  }

  toggleCollapse(id: string) {
    const elem = document.getElementById(id);
    if (elem) elem.classList.toggle('show');
  }

  // Call this method on Enter key press
  applySearch() {
    const text = this.searchText.toLowerCase();
    if (!text) {
      this.filteredSidebar = this.sidebarItems;
      return;
    }

    this.filteredSidebar = this.sidebarItems.map(item => {
      if (item.children) {
        const filteredChildren = item.children.filter(child => child.name.toLowerCase().includes(text));
        return { ...item, children: filteredChildren };
      }
      return item.name.toLowerCase().includes(text) ? item : null;
    }).filter(Boolean);
  }
}
