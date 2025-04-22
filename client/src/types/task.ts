export type Priority = "low" | "medium" | "high";
export type TaskStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "overdue";

export type Task = {
  id: number;
  title: string;
  project: string;
  category: {
    name: string;
    color: string;
    bg: string;
  }
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  owner: string;
};

export type TaskInput = Omit<Task, "id">;

export const statusColors: Record<TaskStatus, string> = {
  "not-started": "bg-gray-100 text-gray-900",
  "in-progress": "bg-yellow-300 text-yellow-900",
  completed: "bg-green-300 text-green-900",
  overdue: "bg-red-300 text-red-900",
};

export const priorityColors: Record<Priority, string> = {
  low: "bg-green-300 text-green-900",
  medium: "bg-yellow-300 text-yellow-900",
  high: "bg-red-300 text-red-900",
};