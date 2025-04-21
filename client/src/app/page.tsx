import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen  text-center px-4">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-secondary p-3 rounded-xl">
          {/* Checkmark icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M20.292 5.708a1 1 0 0 0-1.414-1.416l-9.586 9.59-4.586-4.59a1 1 0 1 0-1.414 1.414l5.293 5.294a1 1 0 0 0 1.414 0l10.293-10.292Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-primary">TaskForge</h1>
      </div>

      {/* Headline */}
      <h2 className="text-3xl font-bold text-primary mb-2">
        Welcome to TaskForge
      </h2>
      <p className="text-tertiary mb-8 text-lg max-w-md">
        A team collaboration platform to manage your work together.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link href="/signup">
          <button className="cursor-pointer bg-secondary text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-tertiary transition">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="cursor-pointer bg-white text-secondary font-semibold px-6 py-2 rounded-lg shadow border border-secondary hover:bg-accent hover:text-white transition">
            Log In
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        <div className="bg-tertiary rounded-xl p-6 shadow-md w-full sm:w-80 text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
            Create Tasks
          </h3>
          <p className="text-light text-sm">
            Add new tasks quickly and easily
          </p>
        </div>

        <div className="bg-tertiary rounded-xl p-6 shadow-md w-full sm:w-80 text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
            Track Progress
          </h3>
          <p className="text-light text-sm">
            Monitor your team's progress in real-time
          </p>
        </div>

        <div className="bg-tertiary rounded-xl p-6 shadow-md w-full sm:w-80 text-center">
          <h3 className="text-white text-lg font-semibold mb-2">
            Manage Projects
          </h3>
          <p className="text-light text-sm">
            Organize your tasks into projects for better visibility
          </p>
        </div>
      </div>
    </main>
  );
}
