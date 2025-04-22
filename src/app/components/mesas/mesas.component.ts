import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mesa } from '../../interfaces/mesas';
import { MesasService } from '../../services/mesas.service';

@Component({
  selector: 'app-mesas',
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css',
})
export class MesasComponent implements OnInit {
  mesas: Mesa[] = [];
  maxX: number = 0;
  maxY: number = 0;
  selectedMesa: Mesa | null = null;

  constructor(private mesasService: MesasService) {}

  ngOnInit(): void {
    //todo get mesas
    this.mesasService.getAllMesas().subscribe({
      next:(response) => {
        this.mesas = response.body?.mesas ?? []

        this.maxX = Math.max(...this.mesas.map(m => m.localX), 0);
        this.maxY = Math.max(...this.mesas.map(m => m.localY), 0);
      }
    })  
  }
  closeModal() {
    this.selectedMesa = null;
  }
  handleOpenMesaDetalhes(mesa: Mesa) {
    this.selectedMesa = mesa;
  }
}
