import type { Task } from "./Task";

export type CreateTask = Omit<Task, "id">;
