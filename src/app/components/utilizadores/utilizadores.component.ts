import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserWithPassword } from '../../interfaces/users';

@Component({
  selector: 'app-utilizadores',
  imports: [CommonModule, FormsModule],
  templateUrl: './utilizadores.component.html',
  styleUrl: './utilizadores.component.css'
})
export class UtilizadoresComponent implements OnInit {
  
  constructor(private userService: UserService) {}

  users: UserWithPassword[] = []

  isModalOpen = false;
  selectedUser: any = null;

  openEditModal(user: any) {
    this.selectedUser = { ...user }; // Clone the user object to avoid direct mutation
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  saveChanges() {
    // Find the user in the array and update their data
    const index = this.users.findIndex((u) => u.id === this.selectedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.selectedUser };
    }
    this.closeModal();
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response) =>{
        this.users = response.body ?? [];
      },
      error:(error) => {
        if (error.status === 404) {
          this.users = [];
        }
      }
    })
  }
}
