"use client";

import { motion } from "framer-motion";
import { Category } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => setFilters({ category: "" })}
          className={`w-full text-left px-3 py-2 rounded transition ${
            filters.category === ""
              ? "bg-orange-100 text-orange-700 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilters({ category: category.id })}
            className={`w-full text-left px-3 py-2 rounded transition ${
              filters.category === category.id
                ? "bg-orange-100 text-orange-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{category.name}</span>
              <span className="text-xs text-gray-500">
                ({category.productCount})
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
