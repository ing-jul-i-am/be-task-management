export interface Task {
    taskid: string;
    title: string;
    description: string;
    status: TaskStatus;
    created_by: number; // User ID of the creator
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
