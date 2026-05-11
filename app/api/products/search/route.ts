import { products } from "@/lib/mock-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "10000");
  const minRating = parseFloat(searchParams.get("minRating") || "0");
  const sortBy = searchParams.get("sortBy") || "relevance";

  let filtered = [...products];

  // Filter by search query
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Filter by price range
  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Filter by rating
  filtered = filtered.filter((p) => p.rating >= minRating);

  // Sort
  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "trending":
      filtered.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
      break;
    case "relevance":
    default:
      // Keep original order or implement relevance scoring
      break;
  }

  return NextResponse.json({
    products: filtered,
    total: filtered.length,
  });
}
