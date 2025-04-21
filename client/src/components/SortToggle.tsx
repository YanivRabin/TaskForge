"use client";

import { Dispatch, SetStateAction } from "react";

type SortOption = "date" | "priority";

type SortToggleProps = {
  sortBy: SortOption;
  setSortBy: Dispatch<SetStateAction<SortOption>>;
};

export default function SortToggle({ sortBy, setSortBy }: SortToggleProps) {
  return (
    <div className="relative w-[140px] h-8 bg-gray-200 rounded-full p-1 flex items-center justify-between">
      {/* Animated pill */}
      <div
        className={`absolute top-1 left-1 w-[66px] h-6 rounded-full bg-secondary transition-all duration-300 ${
          sortBy === "priority" ? "translate-x-[68px]" : "translate-x-0"
        }`}
      />
      <button
        onClick={() => setSortBy("date")}
        className={`relative z-10 w-1/2 text-sm font-semibold transition-all ${
          sortBy === "date" ? "text-white" : "text-secondary"
        }`}
      >
        Date
      </button>
      <button
        onClick={() => setSortBy("priority")}
        className={`relative z-10 w-1/2 text-sm font-semibold transition-all ${
          sortBy === "priority" ? "text-white" : "text-secondary"
        }`}
      >
        Priority
      </button>
    </div>
  );
}
