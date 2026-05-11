"use client";

import { Category } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            href={`/products?category=${category.id}`}
            className="block text-center group"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100 h-28 sm:h-32 mb-2">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 group-hover:text-orange-600 transition">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">
              {category.productCount} items
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
