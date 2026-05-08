import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminDashboardData, UserWithVehicles } from '../models/admin-stats.model';
import { ColorConverter } from '../../../shared/color.converter';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { AdminUsersService, UserFormData } from '../services/admin-users.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/toast/toast.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  data!: AdminDashboardData;
  loading = true;
  ColorConverter = ColorConverter;

  selectedUser?: UserWithVehicles;
  showUserForm = false;
  userFormMode: 'view' | 'edit' | 'create' = 'create';
  submitting = false;
  userToDelete?: UserWithVehicles;

  constructor(
    private route: ActivatedRoute,
    private usersService: AdminUsersService,
    public authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(resolved => {
      this.data = resolved['data'];
      this.loading = false;
    });
  }

  createUser(): void {
    this.selectedUser = undefined;
    this.userFormMode = 'create';
    this.showUserForm = true;
  }

  viewUser(user: UserWithVehicles): void {
    this.selectedUser = user;
    this.userFormMode = 'view';
    this.showUserForm = true;
  }

  editUser(user: UserWithVehicles): void {
    this.selectedUser = user;
    this.userFormMode = 'edit';
    this.showUserForm = true;
  }

  onUserSave(formData: UserFormData): void {
    this.submitting = true;

    const request$ = this.selectedUser?.id
      ? this.usersService.updateUser(this.selectedUser.id, formData)
      : this.usersService.createUser(formData);

    request$.subscribe({
      next: (saved) => {
        if (this.selectedUser?.id) {
          this.data.users = this.data.users.map(u => u.id === saved.id ? saved : u);
          this.toastService.showSuccess('Usuário atualizado com sucesso');
        } else {
          this.data.users = [...this.data.users, saved];
          this.data.stats.userCount++;
          this.toastService.showSuccess('Usuário criado com sucesso');
        }
        this.showUserForm = false;
        this.submitting = false;
      },
      error: (error) => {
        this.toastService.showError('Erro ao salvar usuário');
        this.submitting = false;
      }
    });
  }

  onUserCancel(): void {
    this.showUserForm = false;
    this.selectedUser = undefined;
  }

  askDeleteUser(user: UserWithVehicles): void {
    this.userToDelete = user;
  }

  confirmDeleteUser(): void {
    if (!this.userToDelete) return;

    this.usersService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.data.users = this.data.users.filter(u => u.id !== this.userToDelete!.id);
        this.data.stats.userCount--;
        this.userToDelete = undefined;
        this.toastService.showSuccess('Usuário deletado com sucesso');
      },
      error: () => {
        this.toastService.showError('Erro ao deletar usuário');
        this.userToDelete = undefined;
      }
    });
  }

  cancelDelete(): void {
    this.userToDelete = undefined;
  }

  getColorValue(colorInput: string): string {
    return ColorConverter.parse(colorInput);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}

