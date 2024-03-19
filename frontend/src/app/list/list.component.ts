import { Component } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TaskService } from "../tasks.service";
import { Tasks as Task } from '../interfaces/task.interface'
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        FormsModule,
        RouterLink
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent {
    tasks: Task[];
    task: string;
    public show;
    selectedId: number;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private taskService: TaskService, private route: ActivatedRoute) {
        this.tasks = [];
        this.task = '';
        this.show = true;
        this.selectedId = 0;
    }

    title = 'List';

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
            // console.log(data);
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
            // console.log(data);

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
