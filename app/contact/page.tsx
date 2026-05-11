"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">We&apos;re here to help</p>
        </div>
      </section>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" />
              <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"></textarea>
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition">Send Message</button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="flex gap-4">
              <Mail size={24} className="text-primary flex-shrink-0" />
              <div>
                <h3 className="text-foreground font-bold mb-1">Email</h3>
                <p className="text-muted-foreground">support@shoppeak.local</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={24} className="text-accent flex-shrink-0" />
              <div>
                <h3 className="text-foreground font-bold mb-1">Phone</h3>
                <p className="text-muted-foreground">1-800-PEAK-99</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin size={24} className="text-secondary flex-shrink-0" />
              <div>
                <h3 className="text-foreground font-bold mb-1">Address</h3>
                <p className="text-muted-foreground">ShopPeak HQ<br />Tech Valley, CA 94000</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
