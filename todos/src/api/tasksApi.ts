import type { CreateTask } from "../types/CreateTask";
import type { Task } from "../types/Task";
// const BASE_URL = "https://jsonplaceholder.typicode.com";
const BASE_URL = "http://localhost:3001";
export async function getAllTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/todos`);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await res.json();

  return data;
}

export async function createTask(task: CreateTask): Promise<Task> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      completed: task.completed,
    }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong while creating the task");
  }

  const data = await res.json();

  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Something went wrong while deleting the task");
  }
}

export async function updateTask(task: Task): Promise<Task> {
  const res = await fetch(`${BASE_URL}/todos/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      completed: task.completed,
    }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong while updating the task");
  }

  const data = await res.json();

  return data;
}
