import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, } from '@nestjs/common';
import { AppService } from './app.service';
import { Tasks } from './interfaces/task.interface'

@Controller('api/tasks')
export class AppController {
    constructor(private readonly appService: AppService) {
    }
    
    @Get()
    getTodos(): Tasks[] {
        try {
            return this.appService.getTasks();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Post()
    createTodo(@Body() { name }: Tasks): Tasks[] {
        try {
            return this.appService.createTask(name);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Patch(':id')
    completeTodo(@Param('id') id: number, @Body() { completed }): Tasks[] {
        try {
            return this.appService.completeTask(id, completed)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    @Delete(':id')
    deleteTodo(@Param('id') id: number): Tasks[] {
        try {
            return this.appService.deleteTask(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}