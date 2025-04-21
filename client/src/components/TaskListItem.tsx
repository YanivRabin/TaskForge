"use client";

import { useState } from "react";
import { Task, TaskStatus } from "@/types/task";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoAlertCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/toast/ToastContext";

type TaskListItemProps = {
  task: Task;
  onTaskStatusChange?: (id: number, newTaskStatus: TaskStatus) => void;
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
  task,
  onTaskStatusChange,
}: TaskListItemProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>(task.status);

  const { id, title, project, dueDate, priority } = task;

  const textColor = priorityColorMap[priority];
  const bgColor = priorityBgMap[priority];
  const icon = priorityIconMap[priority];

  const handleTaskStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    setCurrentStatus(newStatus);
    onTaskStatusChange?.(id, newStatus);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        flex justify-between items-center gap-4
        ${bgColor} border border-gray-200 rounded-xl px-5 py-4
        shadow-sm hover:shadow-md transition-all duration-400 ease-in-out
        ${currentStatus === "completed" ? "opacity-0 scale-95" : "opacity-100 scale-100"}
      `}
    >
      {/* Left: task content */}
      <div className="flex flex-col w-full">
        <h4 className="text-lg font-semibold text-primary">{title}</h4>
        {project && <p className="text-sm text-secondary">Project: {project}</p>}
      </div>

      {/* Right: priority + due date + dropdown */}
      <div className="flex items-center gap-4 min-w-[380px] justify-end">
        <div className="flex justify-center">{icon}</div>
        <div className={`w-26 text-sm font-medium ${textColor} text-center`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </div>
        <div className="text-sm text-secondary whitespace-nowrap w-20 text-right">
          Due {dueDate}
        </div>
        <select
          value={currentStatus}
          onChange={handleTaskStatusChange}
          className="text-sm bg-white border border-gray-300 px-2 py-1 rounded-md focus:ring-2 focus:ring-secondary focus:outline-none"
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
}
