import { type Task, TaskStatus } from '../types/Task';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const badgeClass: Record<TaskStatus, string> = {
  [TaskStatus.OPEN]: 'bg-primary',
  [TaskStatus.IN_PROGRESS]: 'bg-warning text-dark',
  [TaskStatus.DONE]: 'bg-success',
};

export default function KanbanColumn({ title, status, tasks, onStatusChange, onDelete }: KanbanColumnProps) {
  const columnTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="col-md-4">
      <div className="card bg-light border-0">
        <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{title}</h5>
          <span className={`badge ${badgeClass[status]}`}>{columnTasks.length}</span>
        </div>
        <div className="card-body" style={{ minHeight: '300px' }}>
          {columnTasks.length === 0 && (
            <p className="text-muted text-center small">Sin tareas</p>
          )}
          {columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
