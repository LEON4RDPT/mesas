import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Mesa } from '../../interfaces/mesas';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { MesasService } from '../../services/mesas.service';
import { ReservaPost } from '../../interfaces/reservas';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-add-reserva',
  imports: [CommonModule, FormsModule, TimePickerComponent],
  templateUrl: './add-reserva.component.html',
  styleUrl: './add-reserva.component.css',
})
export class AddReservaComponent implements OnInit {
  constructor(
    private mesasService: MesasService,
    private reservaService: ReservaService
  ) {}

  @ViewChild('dateInputRef') dateInputRef!: ElementRef<HTMLInputElement>;
  @Input() userId: number = 0;

  mesas: Mesa[] = [];
  selectedMesa: Mesa | null = null;
  selectedDate: Date | null = null;
  horaInicio: string = '';
  horaFim: string = '';
  today: string = new Date().toISOString().split('T')[0];

  onHoraInicioChange(time: string): void {
    this.horaInicio = time;
  }

  onHoraFimChange(time: string): void {
    this.horaFim = time;
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value ? new Date(input.value) : null;
  }
  handleSelectMesa(event: Event) {
    const id = parseInt((event.target as HTMLSelectElement).value);
    const mesa = this.mesas.find((mesa) => mesa.id === id) || null;
    this.selectedMesa = mesa;
    console.log(mesa);
  }

  createReserva() {
    const confirmation = confirm(
      'Queres mesmo reservar a mesa: ' + this.selectedMesa?.id + '? '
    );
    if (!confirmation) return;
    if (this.userId === 0) return;
    if (!this.selectedMesa) return;
    if (!this.selectedDate) return;

    const dataInicioStr = `${this.selectedDate.toISOString().split('T')[0]}T${
      this.horaInicio
    }:00.000Z`;
    const dataFimStr = `${this.selectedDate.toISOString().split('T')[0]}T${
      this.horaFim
    }:00.000Z`;

    const reserva: ReservaPost = {
      mesaId: this.selectedMesa.id,
      userId: this.userId,
      dataInicio: dataInicioStr,
      dataFim: dataFimStr,
    };
    this.reservaService.postReserva(reserva).subscribe({
      next: (response) => {
        if (response) {
          alert('Reserva criada com sucesso!');
          this.selectedMesa = null;
          this.selectedDate = null;
          this.horaInicio = '';
          this.horaFim = '';
        }
      },
      error: (error) => {
        if (
          error.status === 409 &&
          error.error?.minutesTolerated !== undefined &&
          error.error?.minutes !== undefined
        ) {
          alert(
            `Erro: O tempo máximo permitido para esta mesa é de ${error.error.minutesTolerated} minutos.\n` +
              `Você tentou reservar por ${error.error.minutes} minutos.`
          );
          return;
        }
        if (error.status === 409) {
          alert('Não foi possivel reservar esta mesa pois ja está ocupada!');
        }
        alert('Erro ao criar reserva: ' + error.status);
      },
    });
  }

  openCalendar() {
    this.dateInputRef.nativeElement.showPicker?.(); // For supported browsers
    this.dateInputRef.nativeElement.focus(); // Fallback
  }

  ngOnInit(): void {
    this.mesasService.getAllMesas().subscribe({
      next: (response) => {
          this.mesas = response.body?.filter((element) => element.ativo === true) || [];
      },
    });
  }
}
