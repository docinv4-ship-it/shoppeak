"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu, X, ChevronDown, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/mock-data";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useStore((state) => state.cartItems);
  const cartCount = cartItems.length;

  return (
    <nav className="bg-background border-b border-border text-foreground sticky top-0 z-50 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
              <Zap size={20} className="text-foreground" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">ShopPeak</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 hover:bg-muted rounded-lg transition text-sm">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 hover:bg-muted rounded-lg transition flex items-center gap-1 text-sm">
                Categories
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute left-0 top-full mt-0 pt-2 hidden group-hover:flex flex-col gap-1 bg-card border border-border rounded-lg shadow-xl min-w-48 z-40"
              >
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    className="px-4 py-2 hover:bg-primary/20 hover:text-primary transition rounded-md text-sm"
                  >
                    {cat.name}
                  </Link>
                ))}
              </motion.div>
            </div>

            <Link href="/deals" className="px-4 py-2 hover:bg-muted rounded-lg transition text-sm">
              Deals
            </Link>
            <Link href="/trending" className="px-4 py-2 hover:bg-muted rounded-lg transition text-sm">
              Trending
            </Link>
            <Link href="/blog" className="px-4 py-2 hover:bg-muted rounded-lg transition text-sm">
              Blog
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <Link
              href="/search"
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition border border-border text-sm"
            >
              <Search size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground hidden md:inline">Search...</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-muted rounded-lg transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 flex flex-col gap-2 overflow-hidden"
          >
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Categories */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition flex items-center justify-between"
            >
              Categories
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="pl-4 space-y-1">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    className="block px-4 py-2 text-sm hover:bg-primary/20 hover:text-primary rounded-lg transition"
                    onClick={() => {
                      setIsOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/deals"
              className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Deals
            </Link>
            <Link
              href="/trending"
              className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              <Search size={18} />
              Search
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
