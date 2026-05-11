"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrendingPage() {
  const trending = products.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Trending Now</h1>
          <p className="text-muted-foreground text-lg">Most popular products today</p>
        </div>
      </section>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trending.slice(0, 50).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <motion.div whileHover={{ y: -8 }} className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all h-full flex flex-col">
                <div className="relative h-32 bg-muted overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150x150?text=Product"; }} />
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <p className="text-foreground font-semibold text-xs line-clamp-2 mb-2">{product.name}</p>
                  <div>
                    <span className="text-primary font-bold text-xs">${product.price}</span>
                    <span className="text-secondary font-semibold text-xs ml-2">★ {product.rating}</span>
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
