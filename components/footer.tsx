"use client";

import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Zap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                <Zap size={20} className="text-foreground" />
              </div>
              <span className="text-foreground">ShopPeak</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Premium shopping experience with curated deals and trending products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold text-sm mb-4 uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-primary transition">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-muted-foreground hover:text-primary transition">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-bold text-sm mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-bold text-sm mb-4 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-bold text-sm mb-4 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <a href="mailto:support@shoppeak.local" className="text-muted-foreground hover:text-primary transition">
                  sksheraz358@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">1-800-PEAK-99</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 ShopPeak. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
