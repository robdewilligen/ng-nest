import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Tasks } from './interfaces/task.interface';

@Injectable()
export class AppService {
    private tasks: Array<Tasks>;
    
    constructor() {
        this.tasks = JSON.parse(fs.readFileSync('./task.json', 'utf8'));
    }
    
    getTasks(): Tasks[] {
        return this.tasks;
    }
    
    createTask(name: string): Tasks[] {
        const task = { id: this.tasks.length + 1, name, completed: false };
        this.tasks = [ ...this.tasks, { ...task } ];
        fs.writeFileSync('task.json', JSON.stringify(this.tasks));
        return this.tasks;
    }
    
    completeTask(id: number, completed: boolean): Tasks[] {
        // get the wanted task by ID
        const index = this.getIndex(id);
        
        // read the task details and change boolean
        const task = this.tasks[index];
        const newTask = { "id": task.id, "name": task.name, "completed": completed }
        
        // insert it into the tasks array and write to file
        this.tasks.splice(index, 1, newTask);
        fs.writeFileSync('task.json', JSON.stringify(this.tasks));
        return this.tasks;
    }
    
    deleteTask(id: number): Tasks[] {
        const index = this.getIndex(id);
        this.tasks.splice(index, 1);
        return this.tasks;
    }
    
    getIndex(id: number): number {
        // Define the value of the required item
        const value = this.tasks.find((task) => task.id == id);
        
        // Define the index of the required item and delete it
        return this.tasks.indexOf(value);
    }
}