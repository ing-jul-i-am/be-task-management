import { type Task, TaskStatus } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const statusOptions: { label: string; value: TaskStatus }[] = [
  { label: 'Abierta', value: TaskStatus.OPEN },
  { label: 'En Progreso', value: TaskStatus.IN_PROGRESS },
  { label: 'Completada', value: TaskStatus.DONE },
];

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body p-3">
        <h6 className="card-title mb-1">{task.title}</h6>
        <p className="card-text text-muted small mb-2">{task.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <select
            className="form-select form-select-sm w-auto"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            aria-label={`Cambiar estado de ${task.title}`}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(task.id)}
            aria-label={`Eliminar tarea ${task.title}`}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
