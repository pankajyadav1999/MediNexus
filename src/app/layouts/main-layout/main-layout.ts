import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../../modules/dashboard/dashboard';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DashboardComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout {
  sidebarToggle = true;      // true = sidebar visible, false = hidden
  showDashboard = true;
  searchText: string = '';
  filteredSidebar: any[] = [];

  sidebarItems = [
    { name: 'Dashboard', link: '/dashboard', parent: null },
    { name: 'Patients', parent: null, children: [
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
    this.filteredSidebar = this.sidebarItems.map(item => ({ ...item, open: false }));

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showDashboard = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/dashboard';
      });
  }

  toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle;
  }


  toggleCollapse(itemName: string) {
    const item = this.filteredSidebar.find(i => i.name === itemName);
    if (item) item.open = !item.open;
  }

  applySearch() {
    const text = this.searchText.trim().toLowerCase();
    if (!text) {
      this.filteredSidebar = this.sidebarItems.map(item => ({ ...item, open: false }));
      return;
    }

    this.filteredSidebar = this.sidebarItems
      .map(item => {
        if (item.children) {
          const filteredChildren = item.children.filter(child =>
            child.name.toLowerCase().includes(text)
          );
          if (filteredChildren.length) {
            return { ...item, children: filteredChildren, open: true };
          }
          return null;
        }
        if (item.name.toLowerCase().includes(text)) {
          return item;
        }
        return null;
      })
      .filter(Boolean);
  }
}
