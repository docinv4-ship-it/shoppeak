export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://aliexpress-affiliate.vercel.app/sitemap.xml",
  };
}
