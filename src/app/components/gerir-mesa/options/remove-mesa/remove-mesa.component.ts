import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Mesa } from '../../../../interfaces/mesas';
import { MesasService } from '../../../../services/mesas.service';
import { LoaderComponent } from "../../../loader/loader.component";

@Component({
  selector: 'app-remove-mesa',
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './remove-mesa.component.html',
  styleUrl: './remove-mesa.component.css',
})
export class RemoveMesaComponent implements OnInit {

  

  @Input() onExit!: () => void;
  mesas: Mesa[] = [];
  isLoading = true;
  selectedMesaId: number = 0;
  selectedMesaIsActive = true;
  constructor(private mesaService: MesasService) {}

  ngOnInit(): void {
    this.mesaService.getAllMesas().subscribe({
      next: (value) => {
        this.mesas = value.body ?? [];
      },
      error: (value) => {
        console.log(value);
      },
      complete: () => {
        setTimeout(()=> {
          this.isLoading = false;
        },2000  )
      },
    });
  }

  handleDesativarMesa() {
    if(!confirm("Deseja mesmo desativar esta mesa?")){
      return;
    }
    this.mesaService.deleteMesa(this.selectedMesaId).subscribe({
      next:(response) => {
        alert('Mesa Desativada!')
      },
      error:(err) => {
        console.log(err);
      },
      complete: ()=> {
        this.onExit();
      }
    })
  }
  onMesaSelect() {
    this.selectedMesaIsActive = this.mesas.find((mesa) => mesa.id == this.selectedMesaId)?.ativo || false;
    return;
  }

  handleAtivarMesa() {
    if(!confirm("Deseja mesmo ativar esta mesa?")){
      return;
    }
    const mesa = this.mesas.find((mesa) => mesa.id == this.selectedMesaId);
    if (!mesa) {
      alert('Mesa não encontrada!');
      return;
    } else {
      mesa.ativo = true;

    }
    this.mesaService.updateMesa(mesa).subscribe({
      next:(response) => {
        alert('Mesa Ativada!')
      },
      error:(err) => {
        console.log(err);
      },
      complete: ()=> {
        this.onExit();
      }
    })
  }
    
}
