import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { Comment } from './comment.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This controller handles all the calls related to "/tasks" endpoint
// Notice that what is inside the parenthesis of @Controller is the base route for this controller
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    // This method will handle GET requests to "/tasks"
    @Get()
    getAllTasks(@Request() req): Promise<Task[]> {
        const user = req.user;
        console.log('User making request:', user);
        if (user.role == 'admin') {
            return this.tasksService.getAllTasks();
        } else if (user.role == 'worker') {
            return this.tasksService.getTasksByAssigneeId(user.userId);
        }
    }

    @Get('/:taskId')
    getTaskById(@Param('taskId') taskId: string): Promise<Task | undefined> {
        return this.tasksService.getTaskById(taskId);
    }

    @Post('/create')
    async createTask(@Body() body: Partial<Task>, @Request() req): Promise<Task | Error> {
        const user = req.user;
        body.created_by = user.userId; // Set the creator of the task to the logged-in user
        console.log('User making request:', user);
        return this.tasksService.createTask(body);
    }

    @Post('/update')
    async updateTask(
        @Body('taskid') taskid: string,
        @Body() body: Partial<Task>
    ): Promise<Task | { message: string }> {
        const updated = await this.tasksService.updateTask(taskid, body);
        if (!updated) {
            console.log('Task ' + taskid + ' not found');
            return { message: 'Task not found' };
        }
        console.log('Task ' + taskid + ' updated:', updated);
        return updated;
    }

    @Get('/:taskid/comments')
    async getCommentsByTaskId(@Param('taskid') taskid: string): Promise<Comment[]> {
        return this.tasksService.getCommentsByTaskId(taskid);
    }

    @Post('/:taskid/comments')
    async addComment(
        @Param('taskid') taskid: string,
        @Body() body: { content: string },
        @Request() req
    ): Promise<Comment | { message: string }> {
        const user = req.user;
        const comment = await this.tasksService.addCommentToTask(taskid, {
            user_id: user.userId,
            content: body.content,
        });
        if (!comment) {
            console.log('Task ' + taskid + ' not found');
            return { message: 'Task not found' };
        }
        console.log('Comment added to task ' + taskid + ':', comment);
        return comment;
    }
}
