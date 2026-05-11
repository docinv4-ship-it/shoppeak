"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { products, blogPosts, categories } from "@/lib/mock-data";
import Link from "next/link";
import { ChevronRight, TrendingUp, ShoppingCart, Eye, BookOpen } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password
    if (password === "admin123") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Invalid password");
    }
  };

  const topProducts = [...products]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 5);

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Blog Posts",
      value: blogPosts.length,
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Total Clicks",
      value: products.reduce((sum, p) => sum + (p.clicks || 0), 0),
      icon: Eye,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Demo password: <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <span className="text-gray-900 font-semibold">Admin Dashboard</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome to the admin panel</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      {stat.label}
                    </h3>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Top Products by Clicks
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Clicks
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {product.category}
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">
                        ${product.price}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {product.clicks || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {product.rating}/5
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
