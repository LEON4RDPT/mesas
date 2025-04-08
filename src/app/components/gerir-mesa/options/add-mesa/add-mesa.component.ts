import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mesa } from '../../../../interfaces/mesas';
import { MesasService } from '../../../../services/mesas.service';

@Component({
  selector: 'app-add-mesa',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-mesa.component.html',
  styleUrl: './add-mesa.component.css'
})
export class AddMesaComponent {
  loginForm: FormGroup;
  @Input()  onExit!: () => void;

  constructor(private fb: FormBuilder,private mesasService: MesasService) {
    this.loginForm = this.fb.group({
      tempo: [0, [Validators.required]],
      localX: [0, [Validators.required]],
      localY: [0, [Validators.required]],
      cap: [0,[Validators.required]]
    })
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      alert("Erro! dados Inválidos")
      return;
    }
    if (!confirm("Deseja Criar esta mesa?")) {
      return;
    }

    const { tempo, localX, localY, cap } = this.loginForm.value;  
    if (cap < 1 && tempo < 1) {
      alert("Erro! Capacidade e limite de tempo inválidos!");
      return;
    }
    const mesa: Mesa = {
      id: 0,
      localX: localX, 
      localY: localY,
      capacidadeUsers: cap,
      limiteTempoMin: tempo,
      ativo: true
    }
    this.mesasService.postMesa(mesa).subscribe({
      next:() => {
        alert("Mesa criada com sucesso!");
        this.onExit();
      },
      error:(err)=> {
        switch (err.status) {
          case 400:
            alert("Erro! Dados inválidos.");
            break;
          case 409:
            alert("Erro! Já existe uma mesa com essa localização!");
            break;
          case 500:
            alert("Erro! Ocorreu um erro no servidor.");
            break;
          default:
            alert("Erro desconhecido!");
        }
      }
    })
  }
}
