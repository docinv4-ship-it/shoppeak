"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">ShopPeak Blog</h1>
          <p className="text-muted-foreground text-lg">Tips, guides, and marketplace insights</p>
        </div>
      </section>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary to-accent"></div>
              <div className="p-6">
                <p className="text-primary text-sm font-bold mb-2">SHOPPING TIPS</p>
                <h2 className="text-foreground font-bold text-xl mb-3">How to Find the Best Deals Online</h2>
                <p className="text-muted-foreground mb-4">Discover strategies to maximize your savings while shopping on ShopPeak.</p>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
