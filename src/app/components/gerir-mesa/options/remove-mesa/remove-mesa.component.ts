import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Mesa } from '../../../../interfaces/mesas';
import { MesasService } from '../../../../services/mesas.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-mesa',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './remove-mesa.component.html',
  styleUrl: './remove-mesa.component.css',
})
export class RemoveMesaComponent implements OnInit {
  @Input() onExit!: () => void;
  mesas: Mesa[] = [];
  selectedMesaId: number = 0;
  selectedMesaIsActive = true;
  constructor(
    private mesaService: MesasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.mesaService.getAllMesas().subscribe({
      next: (value) => {
        this.mesas = value.body?.mesas ?? [];
      },
      error: (value) => {
        console.log(value);
      },
    });
  }

  handleDesativarMesa() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mesaService.deleteMesa(this.selectedMesaId).subscribe({
          next: (response) => {
            this.openSnackBar('Mesa Desativada!');
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.onExit();
          },
        });
      }
    });
  }
  onMesaSelect() {
    this.selectedMesaIsActive =
      this.mesas.find((mesa) => mesa.id == this.selectedMesaId)?.ativo || false;
    return;
  }

  handleAtivarMesa() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const mesa = this.mesas.find((mesa) => mesa.id == this.selectedMesaId);
        console.log(mesa);
        if (!mesa) {
          this.openSnackBar('Mesa não encontrada!');
          return;
        } else {
          mesa.ativo = true;
        }
        this.mesaService.updateMesa(mesa).subscribe({
          next: (response) => {
            this.openSnackBar('Mesa Ativada!');
            console.log(response);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.onExit();
          },
        });
      }
    });
  }
  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // Duration in milliseconds
    });
  }
}
