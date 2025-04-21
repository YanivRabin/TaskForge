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
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
};

export type TaskInput = Omit<Task, "id">;
