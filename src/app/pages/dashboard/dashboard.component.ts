import { Component } from '@angular/core';
import { UtilizadoresComponent } from "../../components/utilizadores/utilizadores.component";

@Component({
  selector: 'app-dashboard',
  imports: [UtilizadoresComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
