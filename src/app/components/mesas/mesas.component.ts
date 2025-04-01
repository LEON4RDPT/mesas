import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mesa } from '../../interfaces/mesas';

@Component({
  selector: 'app-mesas',
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent implements OnInit {

  mesas: Mesa[] = []
  maxX : number = 0;
  maxY : number = 0;
  selectedMesa : Mesa|null = null;
  ngOnInit(): void {
   //todo get mesas

   this.mesas.push({id: 0, localX:0, localY:0, CapacidadeUsers: 1, limiteTempoMin: 30, ativo: true})

   this.mesas.forEach(mesa => {
    let maxX = mesa.localX;
    let maxY = mesa.localY;

    if (this.maxX < maxX) {
      this.maxX = maxX;
    }
    if (this.maxY < maxY) {
      this.maxY = maxY;
    }
   });
  }
  closeModal() {
    this.selectedMesa = null;
  }
  handleOpenMesaDetalhes(mesa: Mesa) {
    this.selectedMesa = mesa;
  }
}
