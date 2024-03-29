import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { AppDataSource } from "../database/index.database"
import { Tasks } from "../interfaces/task.interface";
import { TaskEntity as Task } from "../database/entities/task.entity";
import { TaskDetailsEntity as TaskDetails } from "../database/entities/taskDetails.entity";

@Injectable()
export class TaskService {
    private tasks: Array<Tasks>;
    private taskRepository;
    private detailsRepository;
    
    constructor() {
        this.tasks = JSON.parse(fs.readFileSync('./task.json', 'utf8'));
        this.taskRepository = AppDataSource.getRepository(Task);
        this.detailsRepository = AppDataSource.getRepository(TaskDetails);
    }
    
    // GET json tasks
    getTasks(): Tasks[] {
        return this.tasks;
    }
    
    // GET postgresql tasks
    async getDbTasks() {
        return await this.taskRepository.find({
            relations: {
                details: true,
            }
        });
    }
    
    // GET task by ID
    async getDbTask(id: number) {
        console.log("Returning task with ID: ", id);
        return await this.taskRepository.find({
            where: {
                id: id,
            },
        })
    }
    
    // GET completed postgresql tasks
    async getCompleted() {
        console.log("Returning completed tasks");
        return await this.taskRepository.findBy({ completed: true });
    }
    
    // GET uncompleted postgresql tasks
    async getUncompleted() {
        console.log("Getting uncompleted tasks");
        return await this.taskRepository.findBy({ completed: false })
    };
    
    // CREATE json task
    createTask(name: string): Tasks[] {
        const task = { id: this.tasks.length + 1, name, completed: false };
        this.tasks = [ ...this.tasks, { ...task } ];
        fs.writeFileSync('task.json', JSON.stringify(this.tasks));
        return this.tasks;
    }
    
    // CREATE postgresql task
    async createDbTask(name: string) {
        const task = new Task();
        task.name = name;
        task.completed = false;
        
        const details = new TaskDetails();
        details.description = "a new description!";
        
        task.details = details;
        
        // saving the task will also save the details thanks to "cascading: true" in the entity
        await this.taskRepository.save(task);
        console.log(`Task has been saved, the ID is ${ task.id }`);
    }
    
    // PATCH json task to invert completed
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
    
    // PATCH postgresql task to invert completed
    async completeDbTask(id: number) {
        const task = await this.taskRepository.findOneBy({
            id: id
        });
        
        task.completed = !task.completed;
        return await this.taskRepository.save(task);
    }
    
    
    // DELETE json task
    deleteTask(id: number): Tasks[] {
        const index = this.getIndex(id);
        this.tasks.splice(index, 1);
        return this.tasks;
    }
    
    // DELETE postgresql task
    async deleteDbTask(id: number) {
        const task = await this.taskRepository.findOneBy({
            id: id,
        });
        
        return await this.taskRepository.remove(task);
    }
    
    
    // Helper function to get the index of an item in the array by ID
    getIndex(id: number): number {
        // Define the value of the required item
        const value = this.tasks.find((task) => task.id == id);
        
        // Define the index of the required item and delete it
        return this.tasks.indexOf(value);
    }
}
