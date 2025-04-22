"use client";

import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Project } from "@/types/project";
import { Task, TaskStatus, statusColors, priorityColors } from "@/types/task";
import { Clock, Users, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectDetailsTableView() {
  const params = useSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksData = params.get("tasks");
    if (tasksData) {
      const parsedTasks = JSON.parse(tasksData) as Task[];
      setTasks(parsedTasks);
    }

    const projectData = params.get("project");
    if (projectData) {
      const parsedProject = JSON.parse(projectData) as Project;
      setProject(parsedProject);
    }
  }, [params]);

  const categories = Array.from(
    new Map(tasks.map((task) => [task.category.name, task.category])).values()
  );

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
          {project?.title}
        </h1>
        <div className="text-sm text-secondary mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Due {project?.dueDate}
        </div>
        <div className="text-sm text-tertiary flex items-center gap-2">
          <Users className="w-4 h-4" /> Team: {project?.teamMembers.join(", ")}
        </div>
      </div>

      {categories.map((category, index) => (
        <div key={index} className="mb-12">
          <div className="overflow-auto">
            <table className="w-full table-fixed text-md text-center">
              <thead>
                <tr>
                  <th
                    className={`w-4/10 p-3 text-2xl text-left font-bold ${category.color}`}
                  >
                    {category.name}
                  </th>
                  <th className="w-1/10 p-3">Owner</th>
                  <th className="w-2/10 p-3">Status</th>
                  <th className="w-2/10 p-3">Priority</th>
                  <th className="w-1/10 p-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.category.name === category.name)
                  .map((task) => (
                    <tr key={task.id} className="border-t-10 border-white">
                      <td className="p-3 font-medium text-primary border-r-10 border-white bg-gray-100 text-left">
                        {task.title}
                      </td>
                      <td className="p-3 text-secondary border-r-10 border-white bg-gray-100">
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
                      <td
                        className={`p-3 border-r-10 border-white ${
                          statusColors[task.status]
                        }`}
                      >
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
                      <td
                        className={`p-3 border-r-10 border-white ${
                          priorityColors[task.priority]
                        }`}
                      >
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
