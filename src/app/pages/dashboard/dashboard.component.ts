import { Component, OnInit } from '@angular/core';
import { UtilizadoresComponent } from "../../components/utilizadores/utilizadores.component";
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from "../../components/calendario/calendario.component";
import { AddReservaComponent } from "../../components/add-reserva/add-reserva.component";
import { MesasComponent } from "../../components/mesas/mesas.component";
import { StatisticsComponent } from "../../components/statistics/statistics.component";
import { JwtService } from '../../services/jwt.service';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/users';
import { UserService } from '../../services/user.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { GerirMesaComponent } from '../../components/gerir-mesa/gerir-mesa.component';
import { MinhasReservasComponent } from "../../components/minhas-reservas/minhas-reservas.component";

@Component({
  selector: 'app-dashboard',
  imports: [UtilizadoresComponent, CommonModule, CalendarioComponent, AddReservaComponent, MesasComponent, StatisticsComponent, LoaderComponent, GerirMesaComponent, MinhasReservasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
settings() {
throw new Error('Method not implemented.');
}


  selectedPage: number| null = null;
  userData: User | null = null;
  isLoading: boolean = false;
  isAdmin: boolean = false;
  /*
  0 = Mesas
  1 = Reservas
  2 = Estatisticas
  3 = Utilizadores
  */
  constructor (private router: Router, private jwt: JwtService, private cookie: CookieService, private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.jwt.getUserIdFromToken(this.cookie.getCookie('authToken'));
    if (!id) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.getUser(Number(id)).subscribe({
      next: (response) => {
        this.isAdmin = response.body?.isAdmin || false;
        this.userData = {
          name: response.body?.name,
          email: response.body?.email,
          id: Number(id)
        }
        setTimeout(()=> {
          this.isLoading=false;
        }, 2000)
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  logout() {
    const confirmation = confirm("Deseja sair da sua conta?");
    if (!confirmation) {
      return;
    }
    this.cookie.deleteCookie('authToken')
    this.router.navigate(["/"])
  }
}
