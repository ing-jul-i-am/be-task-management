import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // Example tasks

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.warn(`Task ${task.title} has been deleted`);
    return task;
  }

  updateTaskStatus(id: string, status: string): Task {
    const taskStatus = TaskStatus[status as keyof typeof TaskStatus];
    this.getTaskById(id).status = taskStatus;
    return this.getTaskById(id);
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
