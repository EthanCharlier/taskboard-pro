import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../core/services/task.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    FormsModule
  ],
  template: `
    <h2>Liste des tâches</h2>

    @if (tasks$ | async; as tasks) {
      <ul>
        @for (task of tasks; track task.id) {
          <li>{{ task.title }}</li>
        }
      </ul>
    } @else {
      <p>Chargement des tâches ...</p>
    }

    <h2>Actions</h2>

    <input
      type="text"
      placeholder="Nom de la nouvelle tâche"
      [(ngModel)]="newTaskTitle"
    />
    <button (click)="onAddTask()">-></button>

    <p>Temps écoulé: {{ count }} secondes.</p>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  newTaskTitle: any | undefined = undefined;
  intervalId: any | undefined = undefined;
  count: number = 0;
  taskService: TaskService = inject(TaskService);
  tasks$: Observable<{ id: number, title: string}[]> = this.taskService.tasks$;

  addTask(title: string): void {
    this.taskService.addTask(title);
  }

  onAddTask() {
    if (!this.newTaskTitle.trim()) return;
    this.addTask(this.newTaskTitle.trim());
    this.newTaskTitle = '';
  }

  ngOnInit(): void {

    this.intervalId = setInterval((): void => {
      this.count++;
    }, 1000)

    console.log('ngOnInit executed.')
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
    console.log('ngOnDestroy executed.')
  }
}
