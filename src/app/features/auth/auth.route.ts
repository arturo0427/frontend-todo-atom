import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
];
