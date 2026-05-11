import { NextRequest, NextResponse } from "next/server";

interface ClickData {
  productId: string;
  timestamp: string;
  userAgent: string;
}

// In-memory storage for demo purposes
const clicks: ClickData[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const clickData: ClickData = {
      productId,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    clicks.push(clickData);

    return NextResponse.json({
      success: true,
      message: "Click recorded",
      clickCount: clicks.filter((c) => c.productId === productId).length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record click" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalClicks: clicks.length,
    clicksByProduct: [...new Set(clicks.map((c) => c.productId))].map(
      (productId) => ({
        productId,
        clicks: clicks.filter((c) => c.productId === productId).length,
      })
    ),
  });
}
