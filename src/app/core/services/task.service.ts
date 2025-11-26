import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: { id: number, title: string }[] = [
    {id: 1, title: 'Préparer le cours Angular'},
    {id: 2, title: 'Relire le module RxJS'},
    {id: 3, title: 'Corriger les TPs'}
  ]

  private taskSubject:  BehaviorSubject<{ id: number, title: string}[]> = new BehaviorSubject(this.tasks);
  tasks$: Observable<{id: number, title: string}[]> = this.taskSubject.asObservable();

  getTasks(): Observable<{id: number, title: string}[]> {
    return of(this.tasks).pipe(delay(1000));
  }

  addTask(title: string): void {
    const newTask = { id: this.tasks.length + 1, title };
    this.tasks.push(newTask);
    this.taskSubject.next(this.tasks);
  }
}
