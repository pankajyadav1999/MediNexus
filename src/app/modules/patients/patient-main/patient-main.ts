import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-patient-main',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './patient-main.html',
  styleUrl: './patient-main.css'
})
export class PatientMain {

}
