import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Task } from '../../../../core/interfaces/task.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskCardComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  public taskForm!: FormGroup;
  public tasks$!: Observable<Task[]>;

  private refresh$ = new Subject<void>();

  public editingTaskId: string | null = null;

  private _fb = inject(FormBuilder);
  private _task = inject(TaskService);
  private _auth = inject(AuthService);

  ngOnInit(): void {
    this.initTaskForm();
    this.getTaskList();
  }

  initTaskForm(): void {
    this.taskForm = this._fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  saveTask() {
    const user = this._auth.user;
    if (!user) return;
    const { title, description } = this.taskForm.value;

    const payload = {
      userId: user.id,
      title: title!.trim(),
      description: description?.trim() || undefined,
    };

    if (this.editingTaskId) {
      this._task.update(this.editingTaskId, payload).subscribe(() => {
        this.taskForm.reset();
        this.editingTaskId = null;
        this.refresh$.next();
      });
    } else {
      this._task.create(payload).subscribe(() => {
        this.taskForm.reset();
        this.refresh$.next();
      });
    }
  }

  startEdit(task: Task) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
    });
    this.editingTaskId = task.id;
  }

  cancelEdit() {
    this.taskForm.reset();
    this.editingTaskId = null;
  }

  getTaskList() {
    this.tasks$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => this._task.getTasks()),
      map((list) => list.sort((a, b) => b.createdAt - a.createdAt))
    );
  }

  toggleCompleted(task: Task) {
    this._task
      .update(task.id, { completed: !task.completed })
      .subscribe(() => this.refresh$.next());
  }

  remove(task: Task) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._task.delete(task.id).subscribe(() => this.refresh$.next());
        Swal.fire({
          title: 'Deleted!',
          text: 'Your task has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get validationTitle() {
    return this.title?.invalid && this.title.touched;
  }
}
