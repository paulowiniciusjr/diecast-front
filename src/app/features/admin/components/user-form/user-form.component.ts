import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserWithVehicles } from '../../models/admin-stats.model';
import { AdminUsersService, UserFormData } from '../../services/admin-users.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnChanges {

  @Input() user?: UserWithVehicles;
  @Input() submitting = false;
  @Input() mode: 'view' | 'edit' | 'create' = 'create';

  @Output() save = new EventEmitter<UserFormData>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: AdminUsersService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', this.phoneValidator()],
      password: ['']
    });

    this.setupAsyncValidators();
  }

  ngOnChanges() {
    if (this.user) {
      this.form.patchValue({
        username: this.user.username,
        email: this.user.email || '',
        phone: this.user.phone || ''
      });
      this.form.get('password')?.clearAsyncValidators();
    } else {
      this.form.reset();
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }

    if (this.mode === 'view') {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  private setupAsyncValidators(): void {
    const usernameControl = this.form.get('username');
    if (usernameControl) {
      usernameControl.setAsyncValidators((control: AbstractControl) => {
        if (!control.value || control.value.length < 4) {
          return Promise.resolve(null);
        }
        return this.usersService.checkUsernameAvailable(control.value, this.user?.id)
          .toPromise()
          .then(available => available ? null : { usernameTaken: true });
      });
    }

    const emailControl = this.form.get('email');
    if (emailControl) {
      emailControl.setAsyncValidators((control: AbstractControl) => {
        if (!control.value) {
          return Promise.resolve(null);
        }
        return this.usersService.checkEmailAvailable(control.value, this.user?.id)
          .toPromise()
          .then(available => available ? null : { emailTaken: true });
      });
    }
  }

  private phoneValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const phone = control.value.replace(/\D/g, '');
      if (phone.length === 11 || phone.length === 13) {
        return null;
      }
      return { invalidPhone: true };
    };
  }

  formatPhone(value: string): string {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 2) return `+${digits}`;
    if (digits.length <= 5) return `+${digits.slice(0, 2)} (${digits.slice(2)}`;
    if (digits.length <= 10) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;

    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }

  onPhoneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatPhone(input.value);
    this.form.patchValue({ phone: formatted }, { emitEvent: false });
    input.value = formatted;
  }

  submit(): void {
    if (this.form.invalid) return;

    const formData: UserFormData = {
      username: this.form.value.username,
      email: this.form.value.email,
      phone: this.form.value.phone || undefined
    };

    if (this.form.value.password) {
      formData.password = this.form.value.password;
    }

    this.save.emit(formData);

    setTimeout(() => {
      this.cancel.emit();
    }, 1000);
  }

  getPasswordLabel(): string {
    if (this.mode === 'create') return 'Senha (obrigatória)';
    return 'Senha (deixe em branco para não alterar)';
  }
}
