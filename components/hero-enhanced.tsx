"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SEARCH_PLACEHOLDERS = [
  "Search smart watches",
  "Search gaming accessories",
  "Search trending gadgets",
  "Search home electronics",
];

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 70, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -70, 50, 0], y: [0, 60, -30, 0] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.08),transparent_30%)]"
      />
    </div>
  );
}

export function HeroEnhanced() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (query.length > 0 || isFocused) return;

    const fullText = SEARCH_PLACEHOLDERS[placeholderIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (typedText.length < fullText.length) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, placeholderIndex, query, isFocused]);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl">
      <AnimatedBackground />

      <div className="relative z-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur"
          >
            <Zap size={14} className="text-indigo-400" />
            ShopPeak • Premium Marketplace
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Discover products faster with a real marketplace search.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg"
          >
            Search gadgets, deals, and trending products with a clean Amazon-like experience built for mobile and desktop.
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSearch}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/8 shadow-2xl backdrop-blur-md">
              <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center overflow-hidden text-slate-300">
                {query.length === 0 && !isFocused ? (
                  <span className="flex items-center gap-0.5 text-sm font-medium sm:text-base">
                    <span className="transition-all duration-200">
                      {typedText}
                    </span>
                    <motion.span
                      animate={cursorVisible ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="inline-block translate-y-[1px] text-slate-200"
                    >
                      _
                    </motion.span>
                  </span>
                ) : null}
              </div>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="search"
                aria-label="Search products"
                placeholder="Search products, brands, deals..."
                className="w-full rounded-2xl border-0 bg-transparent py-4 pl-5 pr-24 text-sm text-white outline-none placeholder:text-slate-500 sm:py-5 sm:pl-5 sm:text-base"
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                <span className="inline-flex items-center gap-2">
                  <Search size={16} />
                  Search
                </span>
              </button>
            </div>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex flex-wrap items-center justify-center gap-3"
          >
            {["Smart Watch", "Gaming Keyboard", "Earbuds", "Solar Panel"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    router.push(`/search?q=${encodeURIComponent(tag)}`)
                  }
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-indigo-400/40 hover:bg-white/10"
                >
                  {tag}
                </button>
              )
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/products">
              <motion.span
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Shop Now
              </motion.span>
            </Link>

            <Link href="/deals">
              <motion.span
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <TrendingUp size={16} className="mr-2" />
                View Hot Deals
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-slate-300 sm:flex-row sm:gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">⚡</span>
              <span>Fast Search</span>
            </div>
            <div className="hidden h-5 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-base">🛒</span>
              <span>Curated Products</span>
            </div>
            <div className="hidden h-5 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-base">🔒</span>
              <span>Trusted Marketplace</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}