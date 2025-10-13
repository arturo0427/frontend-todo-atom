import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();
  @Output() toggleCompleted = new EventEmitter<Task>();
}
