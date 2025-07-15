import type { MouseEventHandler } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  label: string;
  color?: "green" | "blue" | "red";
  onClick?: () => void;
}

function Button({
  type = "button",
  label,
  color = "blue",
  onClick,
}: ButtonProps) {
  const hoverBgColorMap = {
    red: "hover:bg-red-500",
    green: "hover:bg-green-500",
    blue: "hover:bg-blue-500",
  };
  const borderColorMap = {
    red: "border-red-600",
    green: "border-green-600",
    blue: "border-blue-600",
  };
  const textColorMap = {
    red: "text-red-600",
    green: "text-green-600",
    blue: "text-blue-600",
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (type !== "submit") {
      onClick?.();
    }
  };

  return (
    <button
      type={type}
      onClick={onClick && handleClick}
      className={`h-10 px-4 py-2 border-1 ${borderColorMap[color]} rounded-lg hover:text-white ${hoverBgColorMap[color]} transition-colors cursor-pointer ${textColorMap[color]} font-semibold`}
    >
      {label}
    </button>
  );
}

export default Button;
