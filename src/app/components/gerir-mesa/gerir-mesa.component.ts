import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RemoveMesaComponent } from './options/remove-mesa/remove-mesa.component';
import { AddMesaComponent } from './options/add-mesa/add-mesa.component';
import { ChangeMesaComponent } from './options/change-mesa/change-mesa.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gerir-mesa',
  imports: [
    CommonModule,
    RemoveMesaComponent,
    AddMesaComponent,
    ChangeMesaComponent,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './gerir-mesa.component.html',
  styleUrl: './gerir-mesa.component.css',
})
export class GerirMesaComponent {
  typeSelectedAction = 0;

  goBack(): void {
    this.typeSelectedAction = 0; // Reset to default view
  }
}
