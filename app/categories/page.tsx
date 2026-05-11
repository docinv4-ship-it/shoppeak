"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { categories, products } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shop by Category
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our curated collections and discover amazing products
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category.id);
            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, borderColor: "var(--color-primary)" }}
                  className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all h-full"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=" + category.name;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 relative">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{category.name}</h2>
                    <p className="text-muted-foreground mb-4">{categoryProducts.length} products</p>
                    <div className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                      <span>Browse</span>
                      <span>→</span>
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
