import Link from "next/link";
import Image from "next/image";

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export default function DashboardLayout({ title, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white px-20 py-4 shadow-md flex justify-between items-center">
          <Link href="/dashboard" className="text-lg font-semibold text-primary">
            <Image 
              src="/logo.png"
              alt="Logo"
              width={200}
              height={50}
              className="mr-2"
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-lg text-secondary font-bold">John Doe</span>
            <button className="cursor-pointer bg-secondary text-white px-3 py-1 rounded-md text-md hover:bg-tertiary transition">
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-10 px-20">{children}</main>
      </div>
    </div>
  );
}
