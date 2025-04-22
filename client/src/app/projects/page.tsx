"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/project";
import { Task } from "@/types/task";

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Marketing Website",
    description: "Landing page and blog redesign for Q2 launch",
    dueDate: "Apr 30",
    progress: 65,
    status: "active",
    teamMembers: ["alice", "bob"],
  },
  {
    id: 2,
    title: "Internal CRM Tool",
    description: "Phase 1 of the CRM for sales & support team",
    dueDate: "May 10",
    progress: 40,
    status: "active",
    teamMembers: ["carol", "dave"],
  },
  {
    id: 3,
    title: "Mobile App UI Kit",
    description: "UI system for cross-platform components",
    dueDate: "Apr 25",
    progress: 90,
    status: "archived",
    teamMembers: ["eve", "frank"],
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Draft homepage copy",
    project: "Marketing Website",
    dueDate: "Apr 28",
    priority: "high",
    status: "not-started",
    owner: "",
    category: {
      name: "Content",
      color: "text-blue-900",
      bg: "bg-blue-100",
    },
  },
  {
    id: 2,
    title: "Design hero section",
    project: "Marketing Website",
    dueDate: "Apr 29",
    priority: "medium",
    status: "in-progress",
    owner: "Bob",
    category: {
      name: "Design",
      color: "text-green-900",
      bg: "bg-green-100",
    },
  },
  {
    id: 3,
    title: "SEO plan",
    project: "Marketing Website",
    dueDate: "Apr 27",
    priority: "low",
    status: "not-started",
    owner: "",
    category: {
      name: "SEO",
      color: "text-yellow-900",
      bg: "bg-yellow-100",
    },
  },
];

export default function ProjectsPage() {
  return (
    <DashboardLayout title="My Projects">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary">Projects</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            tasks={initialTasks.filter((t) => t.project === project.title)}
            href={`/projects/${project.id}`}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
