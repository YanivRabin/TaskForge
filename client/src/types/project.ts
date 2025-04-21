export type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  progress: number;
  status: "active" | "completed" | "archived";
  teamMembers: string[];
};
