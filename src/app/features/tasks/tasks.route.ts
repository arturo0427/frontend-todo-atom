import { Route } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';

export const TASKS_ROUTES: Route[] = [
  {
    path: '',
    component: TaskComponent,
    data: { title: 'Tasks' },
  },
];
