export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  seller: string;
  shipping: string;
  inStock: boolean;
  clicks?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    productCount: 1234,
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1505250967868-ba7b7cff17ec?w=500&h=500&fit=crop",
    productCount: 2156,
  },
  {
    id: "home",
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    productCount: 1876,
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop",
    productCount: 934,
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=500&h=500&fit=crop",
    productCount: 1543,
  },
  {
    id: "books",
    name: "Books & Media",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop",
    productCount: 876,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.8,
    reviews: 1243,
    seller: "TechStore",
    shipping: "Free shipping",
    inStock: true,
    clicks: 342,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor",
    price: 199.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.6,
    reviews: 856,
    seller: "ElectroWorld",
    shipping: "Free shipping",
    inStock: true,
    clicks: 521,
  },
  {
    id: "3",
    name: "Vintage Leather Jacket",
    description: "Classic style with premium leather",
    price: 159.99,
    originalPrice: 219.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
    category: "fashion",
    rating: 4.7,
    reviews: 432,
    seller: "FashionHub",
    shipping: "Free shipping",
    inStock: true,
    clicks: 289,
  },
  {
    id: "4",
    name: "4K Ultra HD Webcam",
    description: "Crystal clear video for streaming and conferencing",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.5,
    reviews: 678,
    seller: "TechPro",
    shipping: "Free shipping",
    inStock: true,
    clicks: 198,
  },
  {
    id: "5",
    name: "Comfortable Running Shoes",
    description: "Lightweight design with superior cushioning",
    price: 79.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "sports",
    rating: 4.9,
    reviews: 2103,
    seller: "SportGear",
    shipping: "Free shipping",
    inStock: true,
    clicks: 612,
  },
  {
    id: "6",
    name: "Bamboo Cutting Board Set",
    description: "Eco-friendly with 3 boards and utensils",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    category: "home",
    rating: 4.4,
    reviews: 521,
    seller: "HomeEssentials",
    shipping: "Free shipping",
    inStock: true,
    clicks: 143,
  },
  {
    id: "7",
    name: "LED Smart Bulbs (4-pack)",
    description: "Color changing with app control",
    price: 49.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1565636192335-14f88b7ce338?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.3,
    reviews: 432,
    seller: "SmartHome",
    shipping: "Free shipping",
    inStock: true,
    clicks: 234,
  },
  {
    id: "8",
    name: "Yoga Mat Pro",
    description: "Non-slip with carrying strap",
    price: 34.99,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    category: "sports",
    rating: 4.7,
    reviews: 765,
    seller: "FitnessPro",
    shipping: "Free shipping",
    inStock: true,
    clicks: 378,
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle",
    description: "Keeps drinks cold for 24 hours",
    price: 29.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=500&h=500&fit=crop",
    category: "sports",
    rating: 4.6,
    reviews: 1234,
    seller: "OutdoorGear",
    shipping: "Free shipping",
    inStock: true,
    clicks: 456,
  },
  {
    id: "10",
    name: "Portable Phone Charger",
    description: "50000mAh capacity with fast charging",
    price: 44.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1609042237318-7beb8db72a98?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.5,
    reviews: 892,
    seller: "TechCharger",
    shipping: "Free shipping",
    inStock: true,
    clicks: 567,
  },
  {
    id: "11",
    name: "Wireless Gaming Mouse",
    description: "Low latency with RGB lighting",
    price: 59.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    category: "electronics",
    rating: 4.8,
    reviews: 756,
    seller: "GameTech",
    shipping: "Free shipping",
    inStock: true,
    clicks: 489,
  },
  {
    id: "12",
    name: "Organic Cotton T-Shirt",
    description: "Soft and sustainable fabric",
    price: 24.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    category: "fashion",
    rating: 4.4,
    reviews: 543,
    seller: "EcoWear",
    shipping: "Free shipping",
    inStock: true,
    clicks: 312,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Must-Have Tech Gadgets in 2026",
    excerpt: "Discover the latest technology that will revolutionize your daily life...",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=800&h=400&fit=crop",
    author: "Tech Expert",
    date: "2026-05-08",
    category: "technology",
    readTime: 5,
  },
  {
    id: "2",
    title: "Budget-Friendly Fashion Finds",
    excerpt: "Look stylish without breaking the bank with these affordable pieces...",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1525962211207-8a88fb683ce0?w=800&h=400&fit=crop",
    author: "Fashion Blogger",
    date: "2026-05-05",
    category: "fashion",
    readTime: 4,
  },
  {
    id: "3",
    title: "Home Improvement on a Budget",
    excerpt: "Transform your space with these affordable yet stylish home upgrades...",
    content: "Full article content here...",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
    author: "Interior Designer",
    date: "2026-05-01",
    category: "home",
    readTime: 6,
  },
];
