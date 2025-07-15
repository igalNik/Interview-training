import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import type { CreateTask } from "../types/CreateTask";
import Button from "./Button";

interface FormProps {
  initialData?: Task | null;
  onSubmit: (task: Task | CreateTask) => Promise<void>;
}

function Form({ initialData, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<Task | CreateTask>({
    title: "",
    description: "",
    completed: false,
  });
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: "", description: "", completed: false });
    }
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formData);
    setFormData({ title: "", description: "", completed: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-4 mb-4 items-end"
    >
      <div className="">
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          type="text"
          placeholder="New task title"
          className="border-1 p-2 rounded-lg w-full h-10"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="">
        <label htmlFor="description">Task description</label>
        <input
          id="description"
          type="text"
          placeholder="New task description"
          className="border-1 p-2 rounded-lg w-full h-10"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <Button
        type={"submit"}
        label={initialData ? "Update" : "Add"}
      />
    </form>
  );
}

export default Form;
