"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("trending");

  const sorted = useMemo(() => {
    let result = [...products];
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    }
    return result;
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our complete collection of {products.length} products
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Sort */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="text-foreground font-bold">{sorted.length}</span> products
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border border-border text-foreground rounded-lg px-4 py-2 text-sm"
          >
            <option value="trending">Trending</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {sorted.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all h-full flex flex-col"
              >
                <div className="relative h-32 bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150x150?text=Product";
                    }}
                  />
                  {product.originalPrice && (
                    <div className="absolute top-1 right-1 bg-destructive text-destructive-foreground px-2 py-0.5 rounded text-xs font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <p className="text-foreground font-semibold text-xs line-clamp-2 mb-2">
                    {product.name}
                  </p>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-primary font-bold text-xs">
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
                      <span className="text-muted-foreground">{product.reviews}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
