import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilizadores',
  imports: [CommonModule, FormsModule],
  templateUrl: './utilizadores.component.html',
  styleUrl: './utilizadores.component.css'
})
export class UtilizadoresComponent {
  users = [
    { id: 1, email: 'user1@example.com', nome: 'nome1' },
    { id: 2, email: 'user2@example.com', nome: 'nome2' },
    { id: 3, email: 'user3@example.com', nome: 'nome3' },
  ];

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
}
