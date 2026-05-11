"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useStore } from "@/lib/store";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = cartItems.length > 0 ? 0 : 0;
  const subtotal = total + shipping;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-semibold">Shopping Cart</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-12 text-center"
            >
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md p-4 flex gap-4"
                  >
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="font-semibold text-gray-900 hover:text-orange-600 transition"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600">{item.seller}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-orange-600">
                          ${item.price}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mb-3"
                >
                  Proceed to Checkout
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  or{" "}
                  <Link
                    href="/products"
                    className="text-orange-600 hover:underline font-semibold"
                  >
                    continue shopping
                  </Link>
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
