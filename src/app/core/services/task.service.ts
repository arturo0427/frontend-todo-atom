import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public URL: string = environment.apiBaseUrl + '/tasks';

  private _http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.URL}`);
  }

  create(params: { userId: string; title: string; description?: string }) {
    return this._http.post<Task>(`${this.URL}`, params);
  }

  update(
    id: string,
    patch: Partial<Pick<Task, 'title' | 'description' | 'completed'>>
  ) {
    return this._http.patch<Task>(`${this.URL}/${id}`, patch);
  }

  delete(id: string) {
    return this._http.delete<void>(`${this.URL}/${id}`);
  }
}
