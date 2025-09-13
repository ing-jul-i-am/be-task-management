import { Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';

// This controller handles all the calls related to "/tasks" endpoint
// Notice that what is inside the parenthesis of @Controller is the base route for this controller
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    private tasks: Task[] = []; // Example tasks

    // This method will handle GET requests to "/tasks"
    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Get('/:taskId')
    getTaskById(@Param('taskId') taskId: string): Promise<Task | undefined> {
        return this.tasksService.getTaskById(taskId);
    }

    //Con esto, se accede al body de la request
    // @Post()
    // createTask(@Body() body) { //: Task {
    //     console.log(body);
    // }

    /* @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string): Task {
            console.log(title, description);
            const task = this.tasksService.createTask(title, description);
            console.log('Task', task.title, 'created:', task);
            return task;
    } */
}
