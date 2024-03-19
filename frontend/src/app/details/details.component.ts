import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from "../tasks.service";
import { Tasks as Task } from '../interfaces/task.interface'

@Component({
    selector: 'ng-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    imports: [],
    providers: [],
    standalone: true
})
export class DetailsComponent {
    title = 'details';
    task: any;

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
    ) {
        this.task = [];
    }

    ngOnInit() {
        const taskId = parseInt(<string>this.route.snapshot.paramMap.get('id'))
        this.taskService.getTask(taskId).subscribe((data) => {
            console.log('data', data);

            this.task = data as Task[];
        });
        this.task = this.task[0];
    }
}
