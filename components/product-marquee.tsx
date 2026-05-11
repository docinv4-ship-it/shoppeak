"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export function ProductMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReducedMotion);
  }, []);

  // Duplicate products for seamless infinite loop
  const displayProducts = [...products.slice(0, 6), ...products.slice(0, 6)];

  return (
    <div className="relative w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-12 overflow-hidden">
      {/* Gradient fade effect - left */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />

      {/* Gradient fade effect - right */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

      {/* Marquee container */}
      <div
        className="flex gap-6 px-4 md:px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, -1440],
                }
          }
          transition={
            reducedMotion
              ? {}
              : {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  paused: isPaused,
                }
          }
        >
          {displayProducts.map((product, idx) => (
            <Link
              key={`${product.id}-${idx}`}
              href={`/product/${product.id}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <motion.div
                whileHover={reducedMotion ? {} : { y: -12, scale: 1.02 }}
                className="relative bg-gradient-to-br from-slate-700 to-slate-900 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden w-56 h-64 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:border-white/40"
              >
                {/* Image container */}
                <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/224x160?text=Product";
                    }}
                  />

                  {/* Discount badge */}
                  {product.originalPrice && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg"
                    >
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </motion.div>
                  )}

                  {/* Price badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg"
                  >
                    ${product.price}
                  </motion.div>
                </div>

                {/* Content section */}
                <div className="p-4 flex flex-col justify-between h-24">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-500"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-white ml-1">
                        {product.rating}
                      </span>
                    </div>
                    {product.clicks && (
                      <span className="text-xs text-slate-400">
                        {product.clicks} clicks
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Info text */}
      <div className="text-center mt-8 text-slate-400 text-sm">
        <motion.p
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center justify-center gap-2"
        >
          <span>✨ Best Sellers - Scroll to see more</span>
        </motion.p>
      </div>
    </div>
  );
}
