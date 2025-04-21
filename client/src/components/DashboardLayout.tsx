// components/DashboardLayout.tsx
import Link from "next/link";

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export default function DashboardLayout({ title, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-light p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">TaskForge</h2>
        <nav className="space-y-4 text-sm">
          <Link href="/dashboard" className="block hover:underline">
            Dashboard
          </Link>
          <Link href="/projects" className="block hover:underline">
            Projects
          </Link>
          <Link href="/tasks" className="block hover:underline">
            Tasks
          </Link>
          <Link href="/teams" className="block hover:underline">
            Teams
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-light">
        {/* Top Bar */}
        <header className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-lg font-semibold text-primary">
            {title || "TaskForge"}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-secondary">John Doe</span>
            <button className="cursor-pointer bg-secondary text-white px-3 py-1 rounded-md text-sm hover:bg-tertiary transition">
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
