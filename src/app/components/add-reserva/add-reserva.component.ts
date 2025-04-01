import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Mesa } from '../../interfaces/mesas';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from "../time-picker/time-picker.component";

@Component({
  selector: 'app-add-reserva',
  imports: [CommonModule, FormsModule, TimePickerComponent],
  templateUrl: './add-reserva.component.html',
  styleUrl: './add-reserva.component.css'
})
export class AddReservaComponent {

  mesas: Mesa[] = [
    {
    id: 1,
    limiteTempoMin: 0,
    localX: 0,
    localY: 0,
    CapacidadeUsers: 0,
    ativo: false
  },
  ]
  selectedMesa: Mesa | null = null;
  horaInicio: string = '';
  selectedDate: Date | null = null;
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
    const mesa = this.mesas.find(mesa => mesa.id === id) || null;   
    this.selectedMesa = mesa;
    console.log(mesa);
  }


  createReserva() {
    const confirmation = confirm("Queres mesmo reservar a mesa: " + this.selectedMesa?.id + "? ");
    if (!confirmation) return;
    //todo backend
  }

}
