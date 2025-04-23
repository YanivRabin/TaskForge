"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import { Task } from "@/types/task";

type ProjectCardProps = {
  project: Project;
  tasks: Task[];
  href?: string;
};

export default function ProjectCard({
  project,
  tasks,
  href,
}: ProjectCardProps) {
  const { title, description, dueDate, teamMembers, status } = project;

  const card = (
    <div
      className={`
      bg-white rounded-xl border border-gray-200 shadow-sm
      p-6 w-full
      transition-all duration-200
      hover:shadow-md hover:ring-2 hover:ring-accent/20
      cursor-pointer flex flex-col justify-between gap-2
    `}
      tabIndex={href ? 0 : -1}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        {description && (
          <p className="text-sm text-tertiary line-clamp-2">{description}</p>
        )}
        <div className="text-sm text-secondary">
          Team: {teamMembers.join(", ")}
        </div>
      </div>

      <div className="flex flex-wrap justify-between text-sm mt-2">
        <div className="gap-2 flex items-center">
          <span className="text-gray-400 whitespace-nowrap">
            {tasks.length} Task{tasks.length !== 1 && "s"}
          </span>
        </div>
        {dueDate && (
          <span className="text-secondary whitespace-nowrap ">
            Due {dueDate}
          </span>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link
      href={{
        pathname: href,
        query: {
          project: JSON.stringify(project),
          tasks: JSON.stringify(tasks),
        },
      }}
    >
      {card}
    </Link>
  ) : (
    card
  );
}
