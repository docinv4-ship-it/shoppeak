import { blogPosts } from "@/lib/mock-data";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blog Article - AliExpress Affiliate",
  description: "Read our latest article",
};

export default function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Article not found
          </h1>
          <Link href="/blog" className="text-orange-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/blog" className="hover:text-orange-600">
              Blog
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-semibold line-clamp-1">
              {post.title}
            </span>
          </div>

          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-8"
          >
            <ArrowLeft size={20} />
            Back to blog
          </Link>

          {/* Article */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-96 bg-gray-100 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
                  {post.category}
                </span>
                <span>By {post.author}</span>
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{post.readTime} min read</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>{post.excerpt}</p>
                <p>{post.content}</p>
                <p>
                  This is a sample article. In a production environment, the full
                  article content would be displayed here with proper formatting,
                  images, and interactive elements.
                </p>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-4">Share this article:</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gray-100 overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {relatedPost.readTime} min read
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
