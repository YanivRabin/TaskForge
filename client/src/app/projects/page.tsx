"use client";

import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import { useSearchParams } from "next/navigation";
import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const params = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksData = params.get("tasks");
    if (tasksData) {
      const parsedTasks = JSON.parse(tasksData) as Task[];
      setTasks(parsedTasks);
    }

    const projectData = params.get("project");
    if (projectData) {
      const parsedProject = JSON.parse(projectData) as Project[];
      setProjects(parsedProject);
    }
  }, [params]);

  return (
    <DashboardLayout title="My Projects">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary">Projects</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            tasks={tasks.filter((t) => t.project === project.title)}
            href={`/projects/${project.id}`}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
