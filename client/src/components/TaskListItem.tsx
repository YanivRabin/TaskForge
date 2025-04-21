"use client";

import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoAlertCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

type TaskListItemProps = {
  title: string;
  dueDate: string;
  priority?: "low" | "medium" | "high";
  project?: string;
  completed?: boolean;
  onToggle?: (completed: boolean) => void;
};

const priorityColorMap = {
  low: "text-green-800",
  medium: "text-yellow-800",
  high: "text-red-800",
};

const priorityBgMap = {
  low: "bg-green-300",
  medium: "bg-yellow-300",
  high: "bg-red-300",
};

const priorityIconMap = {
  low: <FaCheckCircle className="text-green-600 text-3xl" />,
  medium: <FaExclamationTriangle className="text-yellow-600 text-3xl" />,
  high: <IoAlertCircleSharp className="text-red-600 text-3xl" />,
};

export default function TaskListItem({
  title,
  dueDate,
  priority = "medium",
  project,
  completed = false,
  onToggle,
}: TaskListItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const [isVisible, setIsVisible] = useState(true);

  const textColor = priorityColorMap[priority];
  const bgColor = priorityBgMap[priority];
  const icon = priorityIconMap[priority];

  const handleCheck = () => {
    setIsChecked(true);
    onToggle?.(true);
    setTimeout(() => setIsVisible(false), 400);
  };

  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        flex justify-between items-center gap-4
        ${bgColor} border border-gray-200 rounded-xl px-5 py-4
        shadow-sm hover:shadow-md transition-all duration-400 ease-in-out
        ${isChecked ? "opacity-0 scale-95" : "opacity-100 scale-100"}
      `}
    >
      {/* Left: checkbox + content */}
      <div className="flex items-center gap-4 w-full">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
          className="h-5 w-5 accent-secondary rounded border-gray-400"
        />

        <div className="flex flex-col w-full">
          <h4
            className={`text-lg font-semibold text-primary ${
              isChecked ? "line-through opacity-60" : ""
            }`}
          >
            {title}
          </h4>
          {project && (
            <p
              className={`text-sm text-secondary ${
                isChecked ? "line-through opacity-60" : ""
              }`}
            >
              Project: {project}
            </p>
          )}
        </div>
      </div>

      {/* Right: priority + due date */}
      <div className="flex items-center gap-2 min-w-[320px] justify-end">
        {/* Icon */}
        <div className="flex justify-center">{icon}</div>

        {/* Priority text */}
        <div className={`w-26 text-sm font-medium ${textColor} text-center`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </div>

        {/* Due date */}
        <div className="text-sm text-secondary whitespace-nowrap w-20 text-right">
          Due {dueDate}
        </div>
      </div>
    </div>
  );
}
