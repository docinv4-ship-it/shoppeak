"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [sortBy, setSortBy] = useState("relevance");

  const results = useMemo(() => {
    if (!query) return [];
    
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    }

    return filtered;
  }, [query, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <Search size={20} className="text-muted-foreground" />
            <input
              type="text"
              defaultValue={query}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-foreground outline-none placeholder-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value;
                  if (value) {
                    window.location.href = `/search?q=${encodeURIComponent(value)}`;
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {query ? (
        <>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Search Results for &quot;{query}&quot;
              </h1>
              <p className="text-muted-foreground">
                Found <span className="text-foreground font-bold">{results.length}</span> products
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border text-foreground rounded-lg px-4 py-2 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {results.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all h-full flex flex-col"
                  >
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/200x200?text=Product";
                        }}
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-foreground font-semibold text-sm line-clamp-2 mb-2">
                          {product.name}
                        </p>
                        <p className="text-muted-foreground text-xs line-clamp-1 mb-3">
                          {product.seller}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-primary font-bold text-sm">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-secondary font-semibold">★ {product.rating}</span>
                          <span className="text-muted-foreground">{product.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No products found matching your search
              </p>
              <Link href="/categories" className="text-primary hover:text-primary/80 font-semibold">
                Browse Categories →
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Enter a search term to find products</p>
        </div>
      )}
    </div>
  );
}
