import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private _auth = inject(AuthService);

  logout() {
    this._auth.logout();
  }
}
