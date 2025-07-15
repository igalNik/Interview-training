import type { Task } from "../types/Task";
import Button from "./Button";

interface ListItemProps extends Task {
  active: boolean;
  onComplete?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
}

function ListItem({
  title,
  description,
  completed,
  active,
  onComplete,
  onDelete,
  onSelect,
}: ListItemProps) {
  return (
    <li
      onClick={onSelect}
      className={`mb-2 max-w-full  h-14 w-2xl decoration-none border-l-10 text-gray-800  ${
        completed ? "border-l-green-600" : "border-l-gray-600"
      }  hover:text-blue-500 hover:border-l-blue-500 hover:bg-stone-200 transition-colors flex rounded-lg border-1 px-2 justify-between  ${
        active ? "bg-stone-200" : ""
      }`}
    >
      <div className="flex py-3 w-full max-w-full items-center justify-between gap-2 overflow-hidden ">
        <div className="flex flex-col justify-start flex-1 overflow-hidden">
          <span className="font-semibold ">{title}</span>
          <span>{description}</span>
        </div>
        <div className="flex items-center justify-end gap-2 flex-1 pr-2 py-2 ">
          {!completed && (
            <Button
              type="button"
              label={"Complete"}
              color={"green"}
              onClick={onComplete}
            />
          )}
          <Button
            type="button"
            label={"Delete"}
            color={"red"}
            onClick={onDelete}
          />
        </div>
      </div>
    </li>
  );
}

export default ListItem;
