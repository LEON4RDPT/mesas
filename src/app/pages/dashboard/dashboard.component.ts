import { Component } from '@angular/core';
import { UtilizadoresComponent } from "../../components/utilizadores/utilizadores.component";
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from "../../components/calendario/calendario.component";
import { AddReservaComponent } from "../../components/add-reserva/add-reserva.component";
import { MesasComponent } from "../../components/mesas/mesas.component";

@Component({
  selector: 'app-dashboard',
  imports: [UtilizadoresComponent, CommonModule, CalendarioComponent, AddReservaComponent, MesasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedPage = 3; 
  /*
  0 = Mesas
  1 = Reservas
  2 = Estatisticas
  3 = Utilizadores
  */


}
