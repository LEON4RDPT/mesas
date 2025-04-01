import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../interfaces/reservas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  thisDate: string = '';
  reservas: Reserva[] = [
    {
      id: 1,
      mesa: {
        id: 1,
        localX: 0,
        localY: 0,
        CapacidadeUsers: 1,
        ativo: true,
        limiteTempoMin: 30
      },
      user: {
        id: 1,
        nome: 'Leonardo',
        email: 'Email bacano'
      },
      dataReserva: new Date(),
      dataInico: new Date(),
      dataFim: new Date()
    }
  ];
  reservasSelected: Reserva[] = [];
  
  dateSelected: Date | null = new Date();
  
  loadDay(event: Event | string): void {
    let date = '';
    if (typeof event !== 'string') {
       date = (event.target as HTMLInputElement).value;
    } else {
      date = event;
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      this.dateSelected = null;
      this.reservasSelected = [];
      return;
    }
    
    this.dateSelected = parsedDate;
    const selectedDateString = parsedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    
    this.reservasSelected = this.reservas.filter(reserva => {
      const reservaDateString = reserva.dataInico.toISOString().split('T')[0];
      return reservaDateString === selectedDateString;
    });
  }
  
  ngOnInit(): void {
    const today = new Date();
    this.thisDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    // Load today's reservations by default
    this.loadDay(this.thisDate);
  }
}
