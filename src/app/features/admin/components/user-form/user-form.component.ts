import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserWithVehicles } from '../../models/admin-stats.model';
import { AdminUsersService, UserFormData } from '../../services/admin-users.service';
import { debounceTime, switchMap, map, distinctUntilChanged, first } from 'rxjs/operators';
import { timer, of, Subject } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user?: UserWithVehicles;
  @Input() submitting = false;
  @Input() mode: 'view' | 'edit' | 'create' = 'create';

  @Output() save = new EventEmitter<UserFormData>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  availableRoles: string[] = [];
  private asyncValidatorsSetup = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private usersService: AdminUsersService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.email]],
      phone: ['', this.phoneValidator()],
      password: [''],
      role: ['']
    });

    this.loadAvailableRoles();
  }

  ngOnInit(): void {
    this.setupAsyncValidators();
  }

  private loadAvailableRoles(): void {
    this.usersService.getAvailableRoles().subscribe(roles => {
      this.availableRoles = roles;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      if (this.user) {
        if (this.user.role && !this.availableRoles.includes(this.user.role)) {
          this.availableRoles = [this.user.role, ...this.availableRoles];
        }
        this.form.patchValue({
          username: this.user.username,
          email: this.user.email || '',
          phone: this.user.phone || this.formatPhone('+55'),
          role: this.user.role || 'USER'
        }, { emitEvent: false });
        this.form.get('password')?.clearAsyncValidators();
      } else {
        this.form.reset();
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        this.form.patchValue({ role: 'USER', phone: this.formatPhone('+55') }, { emitEvent: false });
      }

      if (this.mode === 'view') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupAsyncValidators(): void {
    if (this.asyncValidatorsSetup) return;
    this.asyncValidatorsSetup = true;

    const usernameControl = this.form.get('username');
    if (usernameControl) {
      const asyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
        if (!control.value || control.value.length < 4) {
          return of(null);
        }

        const currentUsername = control.value;
        const originalUsername = this.user?.username;

        if (this.mode === 'edit' && currentUsername === originalUsername) {
          return of(null);
        }

        return timer(400).pipe(
          switchMap(() =>
            this.usersService.checkUsernameAvailable(currentUsername, this.user?.id)
          ),
          map(available => available ? null : { usernameTaken: true }),
          first()
        );
      };

      usernameControl.setAsyncValidators(asyncValidator);
      usernameControl.updateValueAndValidity();
    }
  }

  private phoneValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const phone = control.value.replace(/\D/g, '');
      if (phone.length === 0 || phone.length === 2 || phone.length === 11 || phone.length === 13) {
        return null;
      }
      return { invalidPhone: true };
    };
  }

  formatPhone(value: string): string {
    if (!value) return '+55 ';
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 2) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 2)} (${digits.slice(2)}`;
    if (digits.length <= 9) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;

    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
  }

  onPhoneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (!value.startsWith('+55')) {
      value = '+55' + value.replace(/\D/g, '');
    }

    const formatted = this.formatPhone(value);
    this.form.patchValue({ phone: formatted }, { emitEvent: false });
    input.value = formatted;
  }

  onPhoneFocus(event: any): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      const formatted = this.formatPhone('+55');
      this.form.patchValue({ phone: formatted }, { emitEvent: false });
      input.value = formatted;
    }
  }

  submit(): void {
    if (this.form.invalid || this.form.pending) return;

    const formData: UserFormData = {
      username: this.form.value.username,
      email: this.form.value.email,
      phone: this.form.value.phone || undefined,
      role: this.form.value.role || 'USER'
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
