"use client";

import { Search, Filter } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";

export function SearchBar() {
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
        >
          <Filter size={20} />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range
            </label>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ minPrice: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ maxPrice: parseFloat(e.target.value) || 10000 })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Rating
            </label>
            <select
              value={filters.minRating}
              onChange={(e) =>
                setFilters({ minRating: parseFloat(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="0">All ratings</option>
              <option value="3">3+ stars</option>
              <option value="4">4+ stars</option>
              <option value="4.5">4.5+ stars</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({
                  sortBy: e.target.value as
                    | "relevance"
                    | "price-low"
                    | "price-high"
                    | "rating"
                    | "trending",
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => useStore.getState().resetFilters()}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-100 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
