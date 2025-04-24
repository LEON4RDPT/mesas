import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Mesa } from '../../../../interfaces/mesas';
import { MesasService } from '../../../../services/mesas.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-mesa',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-mesa.component.html',
  styleUrl: './add-mesa.component.css',
})
export class AddMesaComponent {
  loginForm: FormGroup;
  @Input() onExit!: () => void;

  constructor(
    private fb: FormBuilder,
    private mesasService: MesasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      tempo: [0, [Validators.required]],
      localX: [0, [Validators.required]],
      localY: [0, [Validators.required]],
      cap: [0, [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.openSnackBar('Erro! dados Inválidos');
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { tempo, localX, localY, cap } = this.loginForm.value;
        if (cap < 1 && tempo < 1) {
          this.openSnackBar('Erro! Capacidade e limite de tempo inválidos!');
          return;
        }
        const mesa: Mesa = {
          id: 0,
          localX: localX,
          localY: localY,
          capUsers: cap,
          timeLimit: tempo,
          ativo: true,
        };
        this.mesasService.postMesa(mesa).subscribe({
          next: () => {
            this.openSnackBar('Mesa criada com sucesso!');
            this.onExit();
          },
          error: (err) => {
            switch (err.status) {
              case 400:
                this.openSnackBar('Erro! Dados inválidos.');
                break;
              case 409:
                this.openSnackBar(
                  'Erro! Já existe uma mesa com essa localização!'
                );
                break;
              case 500:
                this.openSnackBar('Erro! Ocorreu um erro no servidor.');
                break;
              default:
                this.openSnackBar('Erro desconhecido!');
            }
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
