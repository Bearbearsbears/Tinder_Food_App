import React, { useState } from "react";
//buttons for the filter function-- based upon breakfast, lunch, and dinner. Default 'all' would display all items regardless of filter

export default function Sort({ onFilterChange }) {
  const [filter, setFilter] = useState("all");

  const handleClick = (value) => {
    setFilter(value);
    if (onFilterChange) onFilterChange(value);
  };

  // Tailwind-style button classes
  const baseBtn =
    "px-3 py-1 mx-2 rounded-full text-sm font-semibold border border-zinc-500 transition";
  const active = "bg-white text-zinc-900";
  const inactive = "bg-transparent text-white";

  return (
    <div className="flex justify-center mb-4">
      <button
        className={`${baseBtn} ${filter === "all" ? active : inactive}`}
        onClick={() => handleClick("all")}
      >
        All
      </button>

      <button
        className={`${baseBtn} ${filter === "Breakfast" ? active : inactive}`}
        onClick={() => handleClick("Breakfast")}
      >
        Breakfast
      </button>

      <button
        className={`${baseBtn} ${filter === "Lunch" ? active : inactive}`}
        onClick={() => handleClick("Lunch")}
      >
        Lunch
      </button>

      <button
        className={`${baseBtn} ${filter === "Dinner" ? active : inactive}`}
        onClick={() => handleClick("Dinner")}
      >
        Dinner
      </button>
    </div>
  );
}
