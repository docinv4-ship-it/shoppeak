"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
        </div>
      </section>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p>ShopPeak collects information you provide directly, such as when you create an account, make a purchase, or contact us for support.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@shoppeak.local</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
