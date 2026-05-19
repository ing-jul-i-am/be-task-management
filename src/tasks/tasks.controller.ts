import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// This controller handles all the calls related to "/tasks" endpoint
// Notice that what is inside the parenthesis of @Controller is the base route for this controller
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  private tasks: Task[] = []; // Example tasks

  // This method will handle GET requests to "/tasks"
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string {
    const taskDeleted = this.tasksService.deleteTask(id);
    return `Task ${taskDeleted.title} has been deleted`;
  }

  //Con esto, se accede al body de la request
  // @Post()
  // createTask(@Body() body) { //: Task {
  //     console.log(body);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const task = this.tasksService.createTask(createTaskDto);
    console.log('Task', task.title, 'created:', task);
    return task;
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
