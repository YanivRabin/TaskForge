import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import StatCard from "@/components/StatCard";
import {
  FaTasks,
  FaClock,
  FaFolderOpen,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      {/* Section Title */}
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

      {/* Project cards */}
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
    </DashboardLayout>
  );
}
