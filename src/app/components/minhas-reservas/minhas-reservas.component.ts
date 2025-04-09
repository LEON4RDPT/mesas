import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Reserva } from '../../interfaces/reservas';
import { ReservaService } from '../../services/reserva.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-minhas-reservas',
  imports: [CommonModule],
  templateUrl: './minhas-reservas.component.html',
  styleUrl: './minhas-reservas.component.css'
})
export class MinhasReservasComponent implements OnInit {

  @Input() userId: number = 0;

  reservas: Reserva[] = [];
  nome: string = 'Nome';

  constructor(private reservaService: ReservaService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe({
      next:(value) => {
        this.nome = value.body?.name || 'null';
      }
    })

    this.reservaService.getAllReservas(this.userId).subscribe({
      next: (value) => {
        this.reservas = value.body || []
      }
    })
  }

  getFormattedTime(dateString: string): string {
    const date = new Date(dateString); // Convert string to Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes if necessary
    return `${hours}:${formattedMinutes}`;
  }

  removeReserva(selectedReservaId: number) {
    if (!selectedReservaId) return;
        const confirmation = confirm('Deseja remover esta reserva?');
        if (confirmation) {
          this.reservaService.deleteReserva(selectedReservaId).subscribe({
            next: (value) => {
              alert("Removido com sucesso!");
              this.ngOnInit();
            },
          });
      }  
  }
  
}
