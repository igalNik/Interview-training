import type { Task } from "../types/Task";

export const TASKS_KEY = "tasks";
export function getTasksFromLocalStorage(): Task[] {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
}
export function saveTasksToLocalStorage(tasks: Task[]): void {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
