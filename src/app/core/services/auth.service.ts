import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse, User } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public URL: string = environment.apiBaseUrl + '/auth';

  public userSub = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSub.asObservable();

  private _router = inject(Router);
  private _http = inject(HttpClient);

  constructor() {
    const u = localStorage.getItem('user');
    const t = localStorage.getItem('token');
    if (u && t) this.userSub.next(JSON.parse(u));
  }

  get user(): User | null {
    return this.userSub.value;
  }

  login(email: string, password: string) {
    return this._http
      .post<LoginResponse>(`${this.URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.userSub.next(res.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSub.next(null);
    this._router.navigate(['/auth/login']);
  }
}
