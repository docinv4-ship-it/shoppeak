"use client";

import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import SearchContent from "./search-content";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-muted-foreground text-center">Loading search results...</p>
    </div>
  );
}
