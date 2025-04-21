"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

type ToastProps = {
  id: number;
  message: string;
  onUndo?: () => void;
  onClose: (id: number) => void;
  offset: number;
  duration?: number;
};

export default function Toast({
  id,
  message,
  onUndo,
  onClose,
  offset,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 min-w-[300px]"
      style={{ bottom: `${offset}px` }}
    >
      <span className="flex-1">{message}</span>
      {onUndo && (
        <button onClick={onUndo} className="text-blue-300 font-semibold hover:underline">
          Undo
        </button>
      )}
      <button
        onClick={() => onClose(id)}
        className="text-white hover:text-gray-300"
        aria-label="Dismiss"
      >
        <IoClose className="text-xl" />
      </button>
    </motion.div>
  );
}
