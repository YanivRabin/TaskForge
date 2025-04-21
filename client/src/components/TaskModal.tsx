"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { TaskInput } from "@/types/task";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskInput) => void;
  defaultValues?: TaskInput;
};

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
}: TaskModalProps) {
  const [formData, setFormData] = useState<TaskInput>({
    title: "",
    project: "",
    dueDate: "",
    priority: "medium",
    status: "not-started",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transition-all animate-fade-in">
          <DialogTitle className="text-xl font-bold text-secondary mb-4">
            {defaultValues ? "Edit Task" : "Create Task"}
          </DialogTitle>

          <div className="space-y-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none px-3 py-2 rounded-lg text-sm"
            />
            <input
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Project Name"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none px-3 py-2 rounded-lg text-sm"
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none px-3 py-2 rounded-lg text-sm"
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none px-3 py-2 rounded-lg text-sm"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {defaultValues && (
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none px-3 py-2 rounded-lg text-sm"
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-secondary text-white hover:bg-tertiary text-sm"
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
