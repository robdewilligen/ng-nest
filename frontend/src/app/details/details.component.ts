import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from "../tasks.service";
import { Tasks as Task } from '../interfaces/task.interface'
import { NgIf } from "@angular/common";

@Component({
    selector: 'ng-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    imports: [
        NgIf
    ],
    providers: [],
    standalone: true
})
export class DetailsComponent {
    title = 'details';
    task: any;
    public isLoading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
    ) {
        this.task = [];
    }

    ngOnInit() {
        this.reload();
        this.task = this.task[0];

    }

    getTaskData() {
        const taskId = parseInt(<string>this.route.snapshot.paramMap.get('id'))
        this.taskService.getTask(taskId).subscribe((data) => {
            console.log('data', data);

            this.task = data as Task[];
        });
    }

    reload() {
        this.getTaskData();
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 150)
    }

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
            this.router.navigate(['']);
        });
    }
}
