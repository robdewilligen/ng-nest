import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';

@Module({
    imports: [],
    controllers: [ AppController, TaskController ],
    providers: [ AppService, TaskService ],
})
export class AppModule {
}
