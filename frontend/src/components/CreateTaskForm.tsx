import { useState, type FormEvent } from 'react';

interface CreateTaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

export default function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4 align-items-end">
      <div className="col-md-4">
        <label htmlFor="taskTitle" className="form-label">Título</label>
        <input
          id="taskTitle"
          type="text"
          className="form-control"
          placeholder="Nombre de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="col-md-5">
        <label htmlFor="taskDesc" className="form-label">Descripción</label>
        <input
          id="taskDesc"
          type="text"
          className="form-control"
          placeholder="Descripción breve"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <button type="submit" className="btn btn-primary w-100">
          + Nueva Tarea
        </button>
      </div>
    </form>
  );
}
