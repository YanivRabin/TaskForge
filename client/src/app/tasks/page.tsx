"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskListItem from "@/components/TaskListItem";
import SortToggle from "@/components/SortToggle";
import DashboardLayout from "@/components/DashboardLayout";
import { priorityWeight } from "@/lib/constants";
import { Task } from "@/types/task";
import { useToast } from "@/components/toast/ToastContext";

const allTasks: Task[] = [
  {
    id: 1,
    title: "Write release notes",
    project: "Marketing Website",
    dueDate: "Apr 22",
    priority: "high",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Connect database to API",
    project: "CRM Tool",
    dueDate: "Apr 21",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Finalize app icons",
    project: "Mobile UI Kit",
    dueDate: "Apr 25",
    priority: "low",
    status: "not-started",
  },
  {
    id: 4,
    title: "Fix billing bug",
    project: "CRM Tool",
    dueDate: "Apr 19",
    priority: "high",
    status: "overdue",
  },
];

export default function TasksPage() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");
  const [tasks, setTasks] = useState(allTasks);

  const handleComplete = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prev) => prev.filter((t) => t.id !== id));

    showToast({
      message: `Marked "${task.title}" as complete.`,
      onUndo: () => {
        setTasks((prev) => [task, ...prev]);
      },
    });
  };

  useEffect(() => {
    const statusFilter = searchParams.get("status");
    const overdueFilter = searchParams.get("filter") === "overdue";

    let filtered = allTasks;

    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    } else if (overdueFilter) {
      filtered = filtered.filter((task) => task.status === "overdue");
    }

    setTasks(filtered);
  }, [searchParams]);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "priority") {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    } else {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
  });

  return (
    <DashboardLayout title="Tasks">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-secondary">All Tasks</h2>
          <span className="text-sm text-gray-500">{tasks.length} tasks</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">sort by:</span>
            <SortToggle sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedTasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onTaskStatusChange={(id, newStatus) => {
              if (newStatus === "completed") {
                handleComplete(id);
              } else {
                setTasks((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
                );
              }
            }}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
