import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Reserva } from '../../interfaces/reservas';
import { ReservaService } from '../../services/reserva.service';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-minhas-reservas',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './minhas-reservas.component.html',
  styleUrl: './minhas-reservas.component.css',
})
export class MinhasReservasComponent implements OnInit {
  @Input() userId: number = 0;

  reservas: Reserva[] = [];
  nome: string = 'Nome';

  constructor(
    private reservaService: ReservaService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (value) => {
        this.nome = value.body?.name || 'null';
      },
    });

    this.reservaService.getAllReservasUser(this.userId).subscribe({
      next: (value) => {
        this.reservas = value.body.reservas || [];
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

  removeReserva(selectedReservaId: number) {
    if (!selectedReservaId) return;
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservaService.deleteReserva(selectedReservaId).subscribe({
          next: () => {
            this.openSnackBar("Reserva fechada com sucesso!", "fechar");
            this.ngOnInit();
          }
        });
      }
    });
  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });
  }
  
}
