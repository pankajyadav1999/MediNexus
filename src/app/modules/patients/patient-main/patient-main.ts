import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
@Component({
  selector: 'app-patient-main',
  standalone:true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './patient-main.html',
  styleUrl: './patient-main.css'
})
export class PatientMain {

}
