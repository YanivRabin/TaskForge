"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskListItem from "@/components/TaskListItem";
import SortToggle from "@/components/SortToggle";
import DashboardLayout from "@/components/DashboardLayout";
import { priorityWeight } from "@/lib/constants";
import { Task } from "@/types/task";
import { useToast } from "@/components/toast/ToastContext";

export default function TasksPage() {
  const params = useSearchParams();
  const { showToast } = useToast();
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");
  const [tasks, setTasks] = useState<Task[]>([]);

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
    const tasksData = params.get("tasks");
    if (!tasksData) return;
  
    const parsedTasks = JSON.parse(tasksData) as Task[];
  
    const statusFilter = params.get("status");
    const overdueFilter = params.get("filter") === "overdue";
  
    let filtered = parsedTasks;
  
    if (statusFilter) {
      filtered = parsedTasks.filter((task) => task.status === statusFilter);
    } else if (overdueFilter) {
      filtered = parsedTasks.filter((task) => task.status === "overdue");
    }
  
    setTasks(filtered);
  }, [params]);

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
                  prev.map((t) =>
                    t.id === id ? { ...t, status: newStatus } : t
                  )
                );
              }
            }}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
