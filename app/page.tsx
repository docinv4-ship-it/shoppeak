"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroEnhanced } from "@/components/hero-enhanced";
import { ProductMarquee } from "@/components/product-marquee";
import { categories, products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, Clock } from "lucide-react";

export default function Home() {
  const bestDeals = products.filter((p) => p.originalPrice).slice(0, 3);
  const trendingProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <HeroEnhanced />
        </div>

        {/* Product Marquee */}
        <section className="mt-12">
          <ProductMarquee />
        </section>

        {/* Trust Section */}
        <section className="py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <Zap size={32} className="text-primary mx-auto mb-3" />
                <h3 className="text-foreground font-bold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm">Quick & reliable shipping worldwide</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <Shield size={32} className="text-accent mx-auto mb-3" />
                <h3 className="text-foreground font-bold mb-2">100% Authentic</h3>
                <p className="text-muted-foreground text-sm">Verified sellers and genuine products</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-card border border-border rounded-lg p-6 text-center"
              >
                <Clock size={32} className="text-secondary mx-auto mb-3" />
                <h3 className="text-foreground font-bold mb-2">30-Day Returns</h3>
                <p className="text-muted-foreground text-sm">Money back guarantee</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">Browse our curated collections</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/100x100?text=" + cat.name;
                    }}
                  />
                  <h3 className="text-foreground font-semibold text-sm">{cat.name}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{cat.productCount} products</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Best Deals */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Best Deals
              </h2>
              <p className="text-muted-foreground">Limited time offers</p>
            </div>
            <Link href="/deals" className="text-primary hover:text-primary/80 font-semibold">
              View All →
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestDeals.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="relative h-40 bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product";
                      }}
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-foreground font-semibold line-clamp-2 mb-2">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-primary font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-muted-foreground line-through text-xs ml-2">${product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-secondary font-semibold">★ {product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Trending Now
              </h2>
              <p className="text-muted-foreground">Popular right now</p>
            </div>
            <Link href="/trending" className="text-primary hover:text-primary/80 font-semibold">
              View All →
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="relative h-40 bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-foreground font-semibold line-clamp-2 mb-2">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">${product.price}</span>
                      <span className="text-secondary font-semibold">★ {product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest deals and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
              <button className="px-8 py-3 bg-foreground text-background font-bold rounded-lg hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
