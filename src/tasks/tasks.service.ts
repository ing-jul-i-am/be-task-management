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

    async createTask(data: Partial<Task>): Promise<Task> {
        const task: Task = this.tasksRepository.create({
            taskid: uuid(),
            title: data.title,
            description: data.description,
            status: TaskStatus.OPEN,
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log('Created Task:', task);
        return this.tasksRepository.save(task);
    }

    async updateTask(taskid: string, data: Partial<Task>): Promise<Task | null> {
        const task = await this.tasksRepository.findOne({ where: { taskid } });
        if (!task) {
            return null;
        }
        Object.assign(task, data, { updated_at: new Date() });
        return this.tasksRepository.save(task);
    }

    // async createTask(title: string, description: string): Promise<Task> {
    //     const task: Task = this.tasksRepository.create({
    //         taskId: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     });
    //     return this.tasksRepository.save(task);
    //     // this.tasks.push(task);
    //     // return task;
    // }

}