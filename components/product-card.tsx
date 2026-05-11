"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/mock-data";
import { Star, ShoppingCart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  isTrending?: boolean;
}

export function ProductCard({ product, isTrending = false }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const recordClick = useStore((state) => state.recordClick);

  const handleClick = () => {
    recordClick(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        href={`/product/${product.id}`}
        onClick={handleClick}
        className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="relative overflow-hidden bg-gray-100 h-48">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded font-bold text-sm">
              -{discount}%
            </div>
          )}
          {isTrending && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded flex items-center gap-1 text-sm font-semibold">
              <TrendingUp size={14} />
              Trending
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">by {product.seller}</p>

          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-orange-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-green-600 mt-1">{product.shipping}</p>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full mt-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
