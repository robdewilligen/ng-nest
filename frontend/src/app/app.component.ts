import { Component } from '@angular/core';
import { TaskService } from './tasks.service';
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

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
        NgIf
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

    getTasks() {
        console.log("getting tasks!")
        this.taskService.getTasks().subscribe((data) => {
            console.log(data);
            this.tasks = data as Task[];
        });
    }

    async addTask(task: string) {
        console.log("adding task")
        this.taskService.addTask(task).subscribe();
        this.task = '';

        setTimeout( () => this.reload(), 500)
    }

    deleteTask(id: number) {
        this.taskService.deleteTask(id).subscribe((data) => {
            console.log(data);
        });

        setTimeout( () => this.reload(), 500)
    }

    reload() {
        this.getTasks();
        this.show = false;
        setTimeout(() => {
            this.show = true;
        })
    }

}
