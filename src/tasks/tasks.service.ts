import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
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

    async getCommentsByTaskId(taskid: string): Promise<Comment[]> {
        const task = await this.tasksRepository.findOne({ where: { taskid } });
        if (!task) return [];
        return this.commentsRepository.find({ where: { task_id: task.id } });
    }

    async addCommentToTask(taskid: string, data: { user_id: number; content: string }): Promise<Comment | null> {
        const task = await this.tasksRepository.findOne({ where: { taskid } });
        if (!task) {
            console.error(`Task with id ${taskid} not found.`);
            return null;
        }

        const comment = this.commentsRepository.create({
            task_id: task.id,
            user_id: data.user_id,
            content: data.content,
            created_at: new Date(),
        });
        console.log('Created Comment:', comment);
        return this.commentsRepository.save(comment);
    }



}