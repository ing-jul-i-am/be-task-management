import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async getAllTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async getTaskById(taskid: string): Promise<Task | undefined> {
        return this.tasksRepository.findOne({ where: { taskid } });
    }

    // private tasks: Task[] = []; // Example tasks

    /*
    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            taskId: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(taskId: string): Task {
        return this.tasks.find(task => task.taskId === taskId);
    } */
}