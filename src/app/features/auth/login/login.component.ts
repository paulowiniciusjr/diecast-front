import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error = signal(false);
  submitted = signal(false);

  form!: FormGroup<LoginForm>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group<LoginForm>({
      username: this.fb.nonNullable.control('', Validators.required),
      password: this.fb.nonNullable.control('', Validators.required)
    });
  }

  submit(): void {
    this.submitted.set(true);
    this.error.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const username = this.form.controls.username.value;
    const password = this.form.controls.password.value;

    /*
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.error.set(true);
        this.form.setErrors({ invalidCredentials: true });
      }
    });
    */

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/vehicles']);
      },
      error: () => {
        this.error.set(true);
      }
    });



  }

  hasFieldError(field: keyof LoginForm): boolean {
    const control = this.form.controls[field];

    return (
      control.invalid &&
      (control.touched || this.submitted())
    ) || this.error();
  }
}
