import { useCallback, useEffect, useState } from "react";
import type { UseTasksResult } from "../types/UseTasksResult";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../api/tasksApi";
import type { Task } from "../types/Task";
import type { CreateTask } from "../types/CreateTask";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/localStorage";

const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>(() => getTasksFromLocalStorage());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        if (tasks.length === 0) {
          const fetchedTasks = await getAllTasks();
          setTasks(fetchedTasks);
        }
      } catch (err) {
        const error = err as Error;

        setError(error.message || "An error occurred while fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const create = useCallback(async (task: CreateTask) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An error occurred while creating the task");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An error occurred while deleting the task");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (task: Task) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      return updatedTask;
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An error occurred while updating the task");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { tasks, loading, error, create, remove, update };
};

export default useTasks;
