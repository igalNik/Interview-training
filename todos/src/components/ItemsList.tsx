import { useState } from "react";
import type { Task } from "../types/Task";
import ListItem from "./ListItem";

interface ItemsListProps {
  tasks: Task[];
  onComplete: (task: Task) => Promise<Task>;
  onDelete: (id: string) => Promise<void>;
  onSelect?: (task: Task | null) => void;
}

function ItemsList({ tasks, onComplete, onDelete, onSelect }: ItemsListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSelect = (task: Task) => {
    if (selectedTask?.id === task.id) {
      setSelectedTask(null);
      onSelect?.(null);
      return;
    }
    setSelectedTask(task);
    onSelect?.(task);
  };

  return (
    <ul className="flex flex-col list-none overflow-y-scroll flex-grow">
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
          onComplete={() => onComplete(task)}
          onDelete={() => onDelete(task.id)}
          onSelect={() => handleSelect(task)}
          active={task.id === selectedTask?.id}
        />
      ))}
    </ul>
  );
}

export default ItemsList;
