"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DealsPage() {
  const deals = products.filter((p) => p.originalPrice).sort((a, b) => {
    const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
    const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
    return bDiscount - aDiscount;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Today&apos;s Deals</h1>
          <p className="text-muted-foreground text-lg">Limited time offers with massive savings</p>
        </div>
      </section>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => {
            const discount = Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100);
            return (
              <Link key={product.id} href={`/product/${product.id}`}>
                <motion.div whileHover={{ y: -8 }} className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all h-full flex flex-col">
                  <div className="relative h-40 bg-muted overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/200x200?text=Product"; }} />
                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-lg text-sm font-bold">-{discount}%</div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <p className="text-foreground font-semibold text-sm line-clamp-2 mb-2">{product.name}</p>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary font-bold">${product.price}</span>
                        <span className="text-muted-foreground line-through text-xs">${product.originalPrice}</span>
                      </div>
                      <span className="text-secondary font-semibold text-sm">★ {product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
