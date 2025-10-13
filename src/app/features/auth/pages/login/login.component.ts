import { CommonModule } from '@angular/common';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  private _router = inject(Router);
  private _fb = inject(FormBuilder);
  private _auth = inject(AuthService);

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const email = this.form.value.email!.trim();
    const password = this.form.value.password;

    this._auth.login(email, password).subscribe({
      next: () => this._router.navigate(['/tasks']),
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Login failed',
          icon: 'error',
        });
      },
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get validationEmail() {
    return this.email?.invalid && this.email.touched;
  }

  get validationPassword() {
    return this.password?.invalid && this.password.touched;
  }
}
