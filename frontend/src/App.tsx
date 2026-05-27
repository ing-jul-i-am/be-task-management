import { useEffect, useState } from 'react';
import { type Task, TaskStatus } from './types/Task';
import { getAllTasks, createTask, updateTaskStatus, deleteTask } from './api/tasksApi';
import KanbanColumn from './components/KanbanColumn';
import CreateTaskForm from './components/CreateTaskForm';

const columns: { title: string; status: TaskStatus }[] = [
  { title: '📋 Abiertas', status: TaskStatus.OPEN },
  { title: '🔄 En Progreso', status: TaskStatus.IN_PROGRESS },
  { title: '✅ Completadas', status: TaskStatus.DONE },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
      setError(null);
    } catch {
      setError('No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo en el puerto 3000.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (title: string, description: string) => {
    try {
      const newTask = await createTask(title, description);
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError('Error al crear la tarea.');
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Error al actualizar el estado.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Error al eliminar la tarea.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🗂️ Task Manager — Kanban</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Cerrar"></button>
        </div>
      )}

      <CreateTaskForm onSubmit={handleCreate} />

      <div className="row g-3">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
