import { Component } from '@angular/core';
import { UtilizadoresComponent } from "../../components/utilizadores/utilizadores.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [UtilizadoresComponent, CommonModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedPage = 3; 
  /*
  0 = Mesas
  1 = Calendario
  2 = Estatisticas
  3 = Utilizadores
  */


}
