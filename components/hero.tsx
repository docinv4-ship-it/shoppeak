"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white rounded-lg overflow-hidden shadow-lg mb-8"
    >
      <div className="relative h-64 sm:h-80 flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Discover Amazing Deals
          </h1>
          <p className="text-lg sm:text-xl text-orange-100 mb-6">
            Find the best products at unbeatable prices
          </p>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors">
              Shop Now
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-orange-600 transition-colors">
              View Deals
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
