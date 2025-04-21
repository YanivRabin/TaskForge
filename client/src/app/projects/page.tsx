"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/project";

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Marketing Website",
    description: "Landing page and blog redesign for Q2 launch",
    dueDate: "Apr 30",
    progress: 65,
    status: "active",
    teamMembers: ["alice@example.com", "bob@example.com"],
  },
  {
    id: 2,
    title: "Internal CRM Tool",
    description: "Phase 1 of the CRM for sales & support team",
    dueDate: "May 10",
    progress: 40,
    status: "active",
    teamMembers: ["carol@example.com", "dave@example.com"],
  },
  {
    id: 3,
    title: "Mobile App UI Kit",
    description: "UI system for cross-platform components",
    dueDate: "Apr 25",
    progress: 90,
    status: "archived",
    teamMembers: ["eve@example.com", "frank@example.com"],
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
            href={`/projects/${project.id}`}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
