import { memo, useState } from "react";
import ItemsList from "./components/ItemsList";
import Spinner from "./components/Spinner";
import useTasks from "./hooks/useTasks";
import type { Task } from "./types/Task";
import type { CreateTask } from "./types/CreateTask";
import Form from "./components/Form";

const App = memo(function () {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { tasks, loading, error, create, remove, update } = useTasks();

  const handleComplete = async (task: Task) => {
    const updatedTask = { ...task, completed: true };
    await update(updatedTask);
    return updatedTask;
  };

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const handleSubmit = async (task: Task | CreateTask) => {
    if ("id" in task) {
      await update(task);
    } else {
      await create(task);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // if (tasks.length === 0 && !loading) {
  //   return <div className="text-gray-500">No tasks available</div>;
  // }

  return (
    <div className="container mx-auto p-4 h-screen overflow-hidden flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Todo List ✅</h1>
      <p className="mb-4 text-gray-600">
        Click on "Complete" to mark a task as done, or "Delete" to remove it.
      </p>

      <Form
        onSubmit={handleSubmit}
        initialData={selectedTask}
      />
      {tasks.length === 0 ? (
        <div className="text-gray-500">No tasks available</div>
      ) : (
        <ItemsList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onSelect={(task) => setSelectedTask(task)}
        />
      )}
      {loading && (
        <div className="flex justify-center items-center h-screen w-screen fixed left-0 top-0 bg-gray-700/20">
          <Spinner />
        </div>
      )}
    </div>
  );
});

export default App;
