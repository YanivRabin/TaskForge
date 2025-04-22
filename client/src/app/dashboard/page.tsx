"use client";

import { useState } from "react";
import { useToast } from "@/components/toast/ToastContext";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import StatCard from "@/components/StatCard";
import TaskListItem from "@/components/TaskListItem";
import SortToggle from "@/components/SortToggle";
import { priorityWeight } from "@/lib/constants";
import { Task } from "@/types/task";
import {
  FaTasks,
  FaClock,
  FaFolderOpen,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Project } from "@/types/project";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Write release notes",
    project: "Marketing Website",
    category: "Marketing",
    dueDate: "Apr 22",
    priority: "high" as const,
    status: "in-progress",
    owner: "Yaniv Rabin",
  },
  {
    id: 2,
    title: "Connect database to API",
    project: "Internal CRM Tool",
    category: "Development",
    dueDate: "Apr 21",
    priority: "medium" as const,
    status: "in-progress",
    owner: "Yaniv Rabin",
  },
  {
    id: 3,
    title: "Finalize app icons",
    project: "Mobile App UI Kit",
    category: "Design",
    dueDate: "Apr 25",
    priority: "low" as const,
    status: "in-progress",
    owner: "Yaniv Rabin",
  },
];

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Marketing Website",
    description: "Landing page and blog redesign for Q2 launch",
    dueDate: "Apr 30",
    progress: 65,
    status: "active",
    teamMembers: ["Yaniv Rabin"],
  },
  {
    id: 2,
    title: "Internal CRM Tool",
    description: "Phase 1 of the CRM for sales & support team",
    dueDate: "May 10",
    progress: 40,
    status: "active",
    teamMembers: ["Yaniv Rabin"],
  },
  {
    id: 3,
    title: "Mobile App UI Kit",
    description: "UI system for cross-platform components",
    dueDate: "Apr 25",
    progress: 90,
    status: "archived",
    teamMembers: ["Yaniv Rabin"],
  },
];

export default function DashboardPage() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState(initialTasks);
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const handleComplete = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prev) => prev.filter((t) => t.id !== id));

    showToast({
      message: `Marked "${task.title}" as complete.`,
      onUndo: () => {
        setTasks((prev) => [task, ...prev]);
      },
    });
  };

  return (
    <DashboardLayout title="Dashboard Overview">
      {/* Quick Stats */}
      <h2 className="text-xl font-semibold text-secondary mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Projects"
          value={8}
          icon={<FaFolderOpen />}
          color="bg-secondary"
          href="/projects"
        />
        <StatCard
          label="Total Tasks"
          value={42}
          icon={<FaTasks />}
          color="bg-primary"
          href="/tasks"
        />
        <StatCard
          label="In Progress"
          value={16}
          icon={<FaClock />}
          color="bg-tertiary"
          href="/tasks?status=in-progress"
        />
        <StatCard
          label="Overdue"
          value={5}
          icon={<FaExclamationTriangle />}
          color="bg-red-600"
          href="/tasks?filter=overdue"
        />
      </div>

      {/* My Projects */}
      <h2 className="text-xl font-semibold text-secondary mb-4">My Projects</h2>
      <div className="flex flex-wrap gap-6 mb-12">
        {initialProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            tasks={initialTasks.filter((t) => t.project === project.title)}
            href={`/projects/${project.id}`}
          />
        ))}
      </div>

      {/* Upcoming Tasks */}
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-secondary">Upcoming Tasks</h2>

        {/* Sort by buttons */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-secondary mr-2 font-medium">
            Sort by:
          </span>
          <SortToggle sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      <div className="space-y-4 mb-12">
        {tasks
          .sort((a, b) => {
            if (sortBy === "priority") {
              return priorityWeight[a.priority] - priorityWeight[b.priority];
            } else {
              const dateA = new Date(a.dueDate).getTime();
              const dateB = new Date(b.dueDate).getTime();

              if (dateA !== dateB) return dateA - dateB;
              return priorityWeight[a.priority] - priorityWeight[b.priority];
            }
          })
          .slice(0, 5)
          .map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onTaskStatusChange={(id, newStatus) => {
                if (newStatus === "completed") {
                  handleComplete(id);
                } else {
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === id ? { ...t, status: newStatus } : t
                    )
                  );
                }
              }}
            />
          ))}
      </div>
    </DashboardLayout>
  );
}
