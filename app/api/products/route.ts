import { products } from "@/lib/mock-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  }

  return NextResponse.json({
    products,
    total: products.length,
  });
}
