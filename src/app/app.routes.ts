import { Routes } from '@angular/router';
import { AuthComponent } from './shared/components/layouts/auth/auth.component';
import { TasksComponent } from './shared/components/layouts/tasks/tasks.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [loginGuard],
    loadChildren: () =>
      import('./features/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/tasks/tasks.route').then((mod) => mod.TASKS_ROUTES),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
