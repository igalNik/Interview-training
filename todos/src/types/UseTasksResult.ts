import type { CreateTask } from "./CreateTask";
import type { Task } from "./Task";

export interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  create: (task: CreateTask) => Promise<Task>;
  remove: (id: string) => Promise<void>;
  update: (task: Task) => Promise<Task>;
}
