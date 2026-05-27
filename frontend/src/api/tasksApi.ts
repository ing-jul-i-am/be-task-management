import axios from 'axios';
import { type Task, type TaskStatus } from '../types/Task';

const API_URL = 'http://localhost:3000/tasks';

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, { title, description });
  return response.data;
};

export const updateTaskStatus = async (id: string, status: TaskStatus): Promise<Task> => {
  const response = await axios.patch<Task>(`${API_URL}/${id}/status`, { status });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
