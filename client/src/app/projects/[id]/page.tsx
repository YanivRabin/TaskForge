"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Project } from "@/types/project";
import { Task, TaskStatus, Priority } from "@/types/task";
import { Clock, Users, Plus } from "lucide-react";
import { useState } from "react";

const mockProject: Project = {
  id: 1,
  title: "Marketing Website",
  description: "Landing page and blog redesign for Q2 launch",
  dueDate: "Apr 30",
  progress: 65,
  status: "active",
  teamMembers: ["Alice", "Bob", "Charlie"],
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Draft homepage copy",
    project: "Marketing Website",
    dueDate: "Apr 28",
    priority: "high",
    status: "not-started",
    owner: "",
    category: "Content",
  },
  {
    id: 2,
    title: "Design hero section",
    project: "Marketing Website",
    dueDate: "Apr 29",
    priority: "medium",
    status: "in-progress",
    owner: "Bob",
    category: "Content",
  },
  {
    id: 3,
    title: "SEO plan",
    project: "Marketing Website",
    dueDate: "Apr 27",
    priority: "low",
    status: "not-started",
    owner: "",
    category: "Marketing",
  },
];

const statusColors: Record<TaskStatus, string> = {
  "not-started": "bg-gray-100 text-gray-900",
  "in-progress": "bg-yellow-300 text-yellow-900",
  completed: "bg-green-300 text-green-900",
  overdue: "bg-red-300 text-red-900",
};

const priorityColors: Record<Priority, string> = {
  low: "bg-green-300 text-green-900",
  medium: "bg-yellow-300 text-yellow-900",
  high: "bg-red-300 text-red-900",
};

export default function ProjectDetailsTableView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  const handleStatusChange = (id: number, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAssignOwner = (id: number, owner: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, owner } : task))
    );
  };

  return (
    <DashboardLayout title="Project Details">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-1">
          {mockProject.title}
        </h1>
        <div className="text-sm text-secondary mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Due {mockProject.dueDate}
        </div>
        <div className="text-sm text-tertiary flex items-center gap-2">
          <Users className="w-4 h-4" /> Team:{" "}
          {mockProject.teamMembers.join(", ")}
        </div>
      </div>

      {categories.map((category, index) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">{category}</h2>

          <div className="overflow-auto shadow-sm">
            <table className="w-full table-fixed text-sm text-center">
              <thead className=" text-secondary">
                <tr>
                  <th className="w-4/10 p-3 border-r">Task</th>
                  <th className="w-1/10 p-3 border-r">Owner</th>
                  <th className="w-2/10 p-3 border-r">Status</th>
                  <th className="w-2/10 p-3 border-r">Priority</th>
                  <th className="w-1/10 p-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.category === category)
                  .map((task) => (
                    <tr key={task.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium text-primary border-r bg-gray-100">
                        {task.title}
                      </td>
                      <td className="p-3 text-secondary border-r bg-gray-100">
                        {task.owner ? (
                          task.owner
                        ) : (
                          <button
                            onClick={() =>
                              handleAssignOwner(task.id, "John Doe")
                            }
                            className="mx-auto flex items-center justify-center w-8 h-8 rounded-full bg-accent text-primary hover:bg-blue-100 transition"
                          >
                            <Plus className="w-6 h-6" />
                          </button>
                        )}
                      </td>

                      <td className={`p-3 border-r ${statusColors[task.status]}`}>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              e.target.value as TaskStatus
                            )
                          }
                          className={`px-2 py-1 rounded-full capitalize focus:outline-none ${
                            statusColors[task.status]
                          }`}
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      </td>
                      <td className={`p-3 border-r ${priorityColors[task.priority]}`}>
                        <span className="inline-block px-2 py-1 rounded-full capitalize">
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-3 text-secondary whitespace-nowrap bg-gray-100">
                        {task.dueDate}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}
