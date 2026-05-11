"use client";

import { products } from "@/lib/mock-data";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useStore } from "@/lib/store";
import { Star, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);
  const addToCart = useStore((state) => state.addToCart);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link href="/products" className="text-indigo-400 hover:text-indigo-300">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-slate-800/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-indigo-400 transition">Products</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10 sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x400?text=Product";
                }}
              />
              {discount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
                >
                  -{discount}%
                </motion.div>
              )}

              {/* Product Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                {product.category.toUpperCase()}
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {/* Title & Rating */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-bold text-lg">
                  {product.rating}
                </span>
                <span className="text-slate-400">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <p className="text-slate-400 text-lg">{product.description}</p>
            </div>

            {/* Pricing Section */}
            <div className="bg-gradient-to-r from-indigo-600/10 to-blue-600/10 border border-indigo-500/20 rounded-xl p-6 mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-indigo-400">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-green-400 font-bold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-slate-400 text-sm">
                {product.inStock ? (
                  <span className="text-green-400 font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-red-400 font-semibold">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Seller & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-800 border border-white/10 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Sold By</p>
                <p className="text-white font-semibold">{product.seller}</p>
              </div>
              <div className="bg-slate-800 border border-white/10 rounded-lg p-4 flex items-center gap-2">
                <Truck size={20} className="text-indigo-400" />
                <div>
                  <p className="text-slate-400 text-sm">Shipping</p>
                  <p className="text-white font-semibold">{product.shipping}</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-3 bg-slate-800/50 border border-white/10 rounded-lg p-3">
                <Shield size={20} className="text-green-400" />
                <div>
                  <p className="text-xs text-slate-400">Buyer Protection</p>
                  <p className="text-sm text-white font-semibold">100% Safe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 border border-white/10 rounded-lg p-3">
                <RotateCcw size={20} className="text-blue-400" />
                <div>
                  <p className="text-xs text-slate-400">Returns</p>
                  <p className="text-sm text-white font-semibold">30 Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 border border-white/10 rounded-lg p-3">
                <Truck size={20} className="text-indigo-400" />
                <div>
                  <p className="text-xs text-slate-400">Delivery</p>
                  <p className="text-sm text-white font-semibold">3-7 Days</p>
                </div>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-white/10 rounded-lg bg-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-slate-700 transition"
                >
                  −
                </button>
                <span className="px-6 py-3 text-white font-semibold flex-1 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-slate-700 transition"
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart size={20} />
                {isAdded ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  "Add to Cart"
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 rounded-lg border transition-all ${
                  isWishlisted
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-slate-800 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-4 rounded-lg bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition"
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            {/* Description Tabs */}
            <div className="bg-slate-800 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Description</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Premium quality materials</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Tested and verified</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">1 year warranty included</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-slate-800 border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x200?text=Product";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white font-semibold line-clamp-2 group-hover:text-indigo-300 transition-colors">
                        {p.name}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-indigo-400 font-bold">
                          ${p.price}
                        </span>
                        <span className="text-xs font-semibold text-yellow-400">
                          ★ {p.rating}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
