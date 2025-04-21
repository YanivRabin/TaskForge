"use client";

import Link from "next/link";
import { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  href?: string;
};

export default function ProjectCard({ project, href }: ProjectCardProps) {
  const { title, description, dueDate, progress } = project;

  const card = (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        p-6 w-full sm:w-80
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02] hover:brightness-105
        focus:outline focus:outline-offset-2 focus:outline-accent
        cursor-pointer flex flex-col justify-between min-h-[240px]
      `}
      tabIndex={href ? 0 : -1}
    >
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-tertiary mb-4 line-clamp-2">
          {description}
        </p>
      )}

      <div className="h-2 w-full bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-secondary">
        <span>{progress}% complete</span>
        {dueDate && <span>Due {dueDate}</span>}
      </div>
    </div>
  );

  return href ? <Link href={href}>{card}</Link> : card;
}
