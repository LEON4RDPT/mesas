import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Reserva } from '../../interfaces/reservas';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  @ViewChild('dateInputRef') dateInputRef!: ElementRef<HTMLInputElement>;
  constructor(private reservaService: ReservaService) {}

  thisDate: string = '';
  reservas: Reserva[] = [];
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

    this.reservasSelected = this.reservas.filter((reserva) => {
      console.log(reserva);
      // Ensure reserva.dataInicio is a valid date string, then create a Date object
      const reservaDate = new Date(reserva.dataInicio);
      if (isNaN(reservaDate.getTime())) {
        return false; // Skip if reserva.dataInicio is not a valid date
      }
      const reservaDateString = reservaDate.toISOString().split('T')[0];
      return reservaDateString === selectedDateString;
    });
    console.log(this.reservasSelected);
  }

  ngOnInit(): void {
    const today = new Date();
    this.thisDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    // Load today's reservations by default
    this.loadDay(this.thisDate);
    this.reservaService.getAllReservas().subscribe({
      next: (value) => {
        this.reservas = value.body || [];
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getFormattedTime(dateString: string): string {
    const date = new Date(dateString); // Convert string to Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes if necessary
    return `${hours}:${formattedMinutes}`;
  }

  openCalendar() {
    this.dateInputRef.nativeElement.showPicker?.(); // For supported browsers
    this.dateInputRef.nativeElement.focus(); // Fallback
  }

  removeReserva(selectedReservaId: number) {
    if (!selectedReservaId) return;
    const confirmation = confirm('Deseja remover esta reserva?');
    if (confirmation) {
      this.reservaService.deleteReserva(selectedReservaId).subscribe({
        next: (value) => {
          alert("Removido com sucesso!");
          this.ngOnInit();
          this.reservasSelected = [];
        },
      });
    }
  }
}
