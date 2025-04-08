import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mesa } from '../../../../interfaces/mesas';
import { MesasService } from '../../../../services/mesas.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-change-mesa',
  templateUrl: './change-mesa.component.html',
  styleUrls: ['./change-mesa.component.css'],
  imports:[FormsModule, CommonModule, ReactiveFormsModule]
})
export class ChangeMesaComponent implements OnInit {
  mesas: Mesa[] = []; // List of mesas
  selectedMesaId: number | null = null; // ID of the selected mesa
  changeForm!: FormGroup; // Form group for updating mesa

  constructor(private fb: FormBuilder, private mesaService: MesasService) {}

  ngOnInit(): void {
    // Initialize the form
    this.changeForm = this.fb.group({
      tempo: [null, [Validators.required, Validators.min(1)]],
      localX: [null, [Validators.required]],
      localY: [null, [Validators.required]],
      cap: [null, [Validators.required, Validators.min(1)]],
    });

    // Load mesas
    this.loadMesas();
  }

  // Load mesas from the service
  loadMesas(): void {
    this.mesaService.getAllMesas().subscribe((mesas) => {
      this.mesas = mesas.body || [];
    });
  }

  // When a mesa is selected, populate the form with its data
    onMesaSelect(): void {
      console.log(this.selectedMesaId);
      console.log(this.mesas);
      const selectedMesa = this.mesas.find((mesa) => mesa.id == this.selectedMesaId);
      console.log('Selected Mesa:', selectedMesa); // Debugging
      if (selectedMesa) {
        this.changeForm.patchValue({
          tempo: selectedMesa.limiteTempoMin,
          localX: selectedMesa.localX,
          localY: selectedMesa.localY,
          cap: selectedMesa.capacidadeUsers,
        });
      }
    }

  // Submit the updated data
  onSubmit(): void {
    if (this.changeForm.valid && this.selectedMesaId !== null) {
      const updatedMesa: Mesa = {
        id: Number(this.selectedMesaId),
        ativo: true,
        limiteTempoMin: this.changeForm.value.tempo,
        localX: this.changeForm.value.localX,
        localY: this.changeForm.value.localY,
        capacidadeUsers: this.changeForm.value.cap
      };
      console.log(updatedMesa);

      this.mesaService.updateMesa(updatedMesa).subscribe({
        next: () => {
          alert('Mesa atualizada com sucesso!');
          this.loadMesas(); // Reload mesas after update
        },
        error: () => {
          alert('Erro ao atualizar a mesa.');
        },
      });
    }
  }
}