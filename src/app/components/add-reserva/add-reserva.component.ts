import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Mesa } from '../../interfaces/mesas';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { MesasService } from '../../services/mesas.service';
import { ReservaPost } from '../../interfaces/reservas';
import { ReservaService } from '../../services/reserva.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-reserva',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-reserva.component.html',
  styleUrl: './add-reserva.component.css',
})
export class AddReservaComponent implements OnInit {
  constructor(
    private mesasService: MesasService,
    private reservaService: ReservaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  @Input() userId: number = 0;
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  mesas: Mesa[] = [];
  selectedMesa: Mesa | null = null;
  selectedDate: Date | null = null;
  horaInicio: string = '';
  horaFim: string = '';
  today: string = new Date().toISOString().split('T')[0];
  selectedMesaId: number | null = null;

  onHoraInicioChange(time: string): void {
    this.horaInicio = time;
  }

  onHoraFimChange(time: string): void {
    this.horaFim = time;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value ?? null;
  }
  handleSelectMesa(event: MatSelectChange) {
    const id = event.value as number;
    this.selectedMesa = this.mesas.find((m) => m.id === id) || null;
  }

  createReserva() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      } else {
        if (this.userId === 0) return;
        if (!this.selectedMesa) return;
        if (!this.selectedDate) return;

        const dataInicioStr = `${
          this.selectedDate.toISOString().split('T')[0]
        }T${this.horaInicio}:00.000Z`;
        const dataFimStr = `${this.selectedDate.toISOString().split('T')[0]}T${
          this.horaFim
        }:00.000Z`;

        const start = new Date(
          `${this.selectedDate.toDateString()} ${this.horaInicio}`
        );
        const end = new Date(
          `${this.selectedDate.toDateString()} ${this.horaFim}`
        );

        if (end <= start) {
          this.openSnackBar(
            'Hora de fim não pode ser menor ou igual à hora de início.',
            'Fechar'
          );
          return;
        }

        const reserva: ReservaPost = {
          mesaId: this.selectedMesa.id,
          userId: this.userId,
          dataInicio: dataInicioStr,
          dataFim: dataFimStr,
        };
        this.reservaService.postReserva(reserva).subscribe({
          next: (response) => {
            if (response) {
              this.openSnackBar('Reserva criada com sucesso!', 'Fechar');
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
              this.openSnackBar(
                `Erro: O tempo máximo permitido para esta mesa é de ${error.error.minutesTolerated} minutos.\n` +
                  `Você tentou reservar por ${error.error.minutes} minutos.`,
                'Fechar'
              );
              return;
            }
            if (error.status === 409) {
              this.openSnackBar(
                'Não foi possivel reservar esta mesa pois ja está ocupada!',
                'Fechar'
              );
            }
            this.openSnackBar(
              'Erro ao criar reserva: ' + error.status,
              'Fechar'
            );
          },
        });
      }
    });
  }

  openCalendar() {
    this.picker.open();
  }

  ngOnInit(): void {
    this.mesasService.getAllMesas().subscribe({
      next: (response) => {
        this.mesas =
          response.body?.mesas?.filter((element) => element.ativo === true) ||
          [];
      },
    });
  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });
  }
}
