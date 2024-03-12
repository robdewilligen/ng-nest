import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Tasks } from "../interfaces/task.interface";
import { TaskService } from "./task.service";

@Controller('api/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }
    
    @Get()
    getTodos() {
        try {
            return this.taskService.getDbTasks();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Post()
    createTodo(@Body() { name }: Tasks) {
        try {
            return this.taskService.createDbTask(name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Patch(':id')
    completeTodo(@Param('id') id: number) {
        try {
            return this.taskService.completeDbTask(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        try {
            return this.taskService.deleteDbTask(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
