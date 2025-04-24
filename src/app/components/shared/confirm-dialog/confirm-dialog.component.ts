import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  template: `
    <mat-dialog-content class="p-4 text-gray-800">
      <h2 class="text-xl font-semibold mb-4">Confirmação</h2>
      <p class="text-base">Tem certeza que deseja remover esta reserva?</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end" class="px-4 pb-4">
      <button
        mat-stroked-button
        color="primary"
        (click)="onCancel()"
        class="mr-2 cursor-pointer"
      >
        Cancelar
      </button>
      <button mat-raised-button color="warn" (click)="onConfirm()" class="cursor-pointer">
        Remover
      </button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogActions, MatDialogContent],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
