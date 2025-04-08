import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User, UserWithPassword } from '../../interfaces/users';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-utilizadores',
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './utilizadores.component.html',
  styleUrl: './utilizadores.component.css'
})
export class UtilizadoresComponent implements OnInit {

  
  
  constructor(private userService: UserService) {}
  @Input() userId: number = 0;
  isLoading: boolean = true;
  newPasswordForUser: string = '';
  users: UserWithPassword[] = []
  isModalOpen = false;
  selectedUser: UserWithPassword|null = null;

  openEditModal(user: any) {
    this.selectedUser = { ...user }; // Clone the user object to avoid direct mutation
    this.isModalOpen = true;
  }

  closeModal() {
    this.newPasswordForUser = '';
    this.isModalOpen = false;
    this.selectedUser = null;
  }
  ngOnInit(): void {
   this.load();
  }
  load() {
    this.userService.getAll().subscribe({
      next: (response) =>{
        this.users = response.body ?? [];
      },
      error:(error) => {
        if (error.status === 404) {
          this.users = [];
        }
      }, 
      complete: () => { 
        setTimeout(() => {
          this.isLoading =false;
        }, 500)
      }
    })
  }
  saveChanges() {
    this.isLoading = true;

    if (!this.selectedUser) {
      return;
    }
    this.selectedUser.password = this.newPasswordForUser;
    this.userService.putUser(this.selectedUser?.id || 0, this.selectedUser).subscribe({
      next:(response) => {
        if (response) {
          alert("Utilizador alterado com sucesso!");
          this.load();
        }
      },
      error:(error) => {
        alert("Erro!");
        this.isLoading = false;
      },
      complete:() => {
        this.isLoading = false;
      }
    })

    // Find the user in the array and update their data
    const index = this.users.findIndex((u) => u.id === this.selectedUser?.id);
    if (index !== -1) {
      if (this.selectedUser && this.selectedUser.id !== undefined) {
        this.users[index] = { ...this.selectedUser } as UserWithPassword;
      }
    }
    this.closeModal();
  }

  handleDelete(userId: number) {
    if (!userId) {
      alert("Erro, Dados Inválidos!")
      return;
    }
    if (userId === this.userId) {
      alert("Erro, Não pode eliminar-se a si mesmo!")
      return;
    }
    if(confirm("Deseja mesmo remover este utilizador?")) {
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          alert("Utilizador Removido!");
        },
        error: (error) => {
          alert("Erro!");
        },
        complete: () => {
          this.load();
          this.isLoading = false;
        }
      })
    }
  
    
  }

}
