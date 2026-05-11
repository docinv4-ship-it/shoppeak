"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { categories, products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { use, useMemo, useState } from "react";
import {
  ChevronRight,
  ArrowLeft,
  ShoppingBag,
  Star,
  Tag,
} from "lucide-react";

const FALLBACK_CATEGORY_IMAGE =
  "https://via.placeholder.com/600x400?text=Category";
const FALLBACK_PRODUCT_IMAGE =
  "https://via.placeholder.com/400x400?text=Product";

type SortOption = "trending" | "rating" | "price-low" | "price-high";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [sortBy, setSortBy] = useState<SortOption>("trending");

  const category = useMemo(() => categories.find((c) => c.id === id), [id]);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === id),
    [id]
  );

  const sorted = useMemo(() => {
    const result = [...categoryProducts];

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
        break;
    }

    return result;
  }, [categoryProducts, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-muted-foreground mb-4">Category not found</p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              <ArrowLeft size={16} />
              Back to Categories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-card/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/categories" className="hover:text-primary transition">
            Categories
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Category Header */}
      <section className="border-b border-border/60 bg-gradient-to-b from-card/60 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between">
            {/* Left content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
                >
                  <ArrowLeft size={14} />
                  Categories
                </Link>

                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary border border-primary/20">
                  <Tag size={14} />
                  Selected Category
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {category.name}
              </h1>

              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
                Browse curated products in <span className="text-foreground font-medium">{category.name}</span>.
                Clean listings, fast search, and a marketplace-style layout made for mobile and desktop.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                <div className="rounded-full border border-border bg-card px-4 py-2">
                  <span className="text-muted-foreground">Products: </span>
                  <span className="font-semibold text-foreground">{sorted.length}</span>
                </div>
                <div className="rounded-full border border-border bg-card px-4 py-2">
                  <span className="text-muted-foreground">Category: </span>
                  <span className="font-semibold text-foreground">{category.name}</span>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
                <img
                  src={category.image || FALLBACK_CATEGORY_IMAGE}
                  alt={category.name}
                  className="h-52 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_CATEGORY_IMAGE;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{sorted.length}</span>{" "}
            products in{" "}
            <span className="font-semibold text-foreground">{category.name}</span>
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full sm:w-auto rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="trending">Trending</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {sorted.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {sorted.map((product, index) => {
              const productHref = `/product/${product.id}`;
              const discount =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;

              return (
                <Link key={product.id} href={productHref}>
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    whileHover={{ y: -6 }}
                    className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image || FALLBACK_PRODUCT_IMAGE}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                        }}
                      />

                      {discount > 0 && (
                        <div className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground shadow">
                          -{discount}%
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {product.seller}
                        </p>
                        <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-foreground">
                          {product.name}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Tag size={14} className="text-primary" />
                        <span>{category.name}</span>
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold text-primary">
                            ${product.price}
                          </p>
                          {product.originalPrice ? (
                            <p className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice}
                            </p>
                          ) : null}
                        </div>

                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500">
                            <Star size={12} fill="currentColor" />
                            {product.rating}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {product.reviews} reviews
                          </p>
                        </div>
                      </div>

                      <div className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition group-hover:opacity-95">
                        <ShoppingBag size={16} />
                        View Product
                      </div>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}