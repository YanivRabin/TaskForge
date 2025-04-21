"use client";

import { useState } from "react";
import { useToast } from "@/components/toast/ToastContext";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import StatCard from "@/components/StatCard";
import TaskListItem from "@/components/TaskListItem";
import {
  FaTasks,
  FaClock,
  FaFolderOpen,
  FaExclamationTriangle,
} from "react-icons/fa";

const initialTasks = [
  {
    id: 1,
    title: "Write release notes",
    project: "Marketing Website",
    dueDate: "Apr 22",
    priority: "high" as const,
  },
  {
    id: 2,
    title: "Connect database to API",
    project: "CRM Tool",
    dueDate: "Apr 23",
    priority: "medium" as const,
  },
  {
    id: 3,
    title: "Finalize app icons",
    project: "Mobile UI Kit",
    dueDate: "Apr 25",
    priority: "low" as const,
  },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const { showToast } = useToast();

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
        <ProjectCard
          title="Marketing Website"
          description="Landing page and blog redesign for Q2 launch"
          progress={65}
          dueDate="Apr 30"
          href="/projects/marketing-website"
        />
        <ProjectCard
          title="Internal CRM Tool"
          description="Phase 1 of the CRM for sales & support team"
          progress={40}
          dueDate="May 10"
          href="/projects/internal-crm"
        />
        <ProjectCard
          title="Mobile App UI Kit"
          description="UI system for cross-platform components"
          progress={90}
          dueDate="Apr 25"
          href="/projects/ui-kit"
        />
      </div>

      {/* Upcoming Tasks */}
      <h2 className="text-xl font-semibold text-secondary mb-4">
        Upcoming Tasks
      </h2>
      <div className="space-y-4 mb-12">
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            title={task.title}
            project={task.project}
            dueDate={task.dueDate}
            priority={task.priority}
            completed={false}
            onToggle={() => handleComplete(task.id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
