import { Component } from '@angular/core';
import { TaskService } from './tasks.service';
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";

interface Task {
    id: number;
    name: string;
    completed: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        NgClass
    ],
    providers: [
        TaskService
    ],
    standalone: true
})
export class AppComponent {
    tasks: Task[];
    task: string;
    public show;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private taskService: TaskService) {
        this.tasks = [];
        this.task = '';
        this.show = true;
    }

    title = 'frontend';

    ngOnInit() {
        this.getTasks();
    }

    //Reloads the tasks after 'x'ms
    reload() {
        this.getTasks();
        this.show = false;
        setTimeout(() => {
            this.show = true;
        }, 150)
    }

    // READ tasks
    getTasks() {
        this.taskService.getTasks().subscribe((data) => {
            console.log(data);
            this.tasks = data as Task[];
        });
    }

    // CREATE tasks
    addTask(task: string) {
        this.taskService.addTask(task).subscribe();
        this.task = '';

        this.reload();
    }

    // PATCH tasks (complete)
    completeTask(id: number, completed: boolean) {
        this.taskService.completeTask(id, completed).subscribe((data) => {
            console.log(data);

            this.reload();
        });
    }

    // DELETE Tasks
    deleteTask(id: number) {
        this.taskService.deleteTask(id).subscribe((data) => {
            console.log(data);

            this.reload();
        });
    }
}
