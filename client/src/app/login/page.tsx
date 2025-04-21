"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call your API here
    console.log({ email, password });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border-2 shadow-md p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary">
          Log In to TaskForge
        </h2>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-secondary">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-secondary">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-lg font-semibold hover:bg-tertiary transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-tertiary">
          Don’t have an account? <a href="/signup" className="text-accent underline">Sign Up</a>
        </p>
      </form>
    </main>
  );
}
