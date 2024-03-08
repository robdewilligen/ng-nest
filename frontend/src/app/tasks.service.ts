import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    host = 'http://localhost:3000/api';

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private http: HttpClient) {
    }

    getTasks() {
        return this.http.get(`${ this.host }/tasks`).pipe(map((res) => res));
    }

    addTask(todo: string) {
        return this.http.post(`${ this.host }/tasks`, {
            name: todo,
            completed: false,
        });
    }

    completeTask(id: number, completed: boolean) {
        return this.http.patch(`${ this.host }/tasks/${ id }`, {
            completed: completed,
        })
    }

    deleteTask(id: number) {
        return this.http.delete(`${ this.host }/tasks/${ id }`);
    }
}
