"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
        </div>
      </section>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">1. User Agreement</h2>
            <p>By accessing and using ShopPeak, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on ShopPeak for personal, non-commercial transitory viewing only.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. Disclaimer</h2>
            <p>The materials on ShopPeak are provided on an &apos;as is&apos; basis. ShopPeak makes no warranties, expressed or implied.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">4. Limitations</h2>
            <p>In no event shall ShopPeak or its suppliers be liable for any damages arising out of or in connection with your use of ShopPeak.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
