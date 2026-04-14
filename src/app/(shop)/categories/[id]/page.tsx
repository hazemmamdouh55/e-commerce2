"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  imageCover?: string;
};

const categories = [
  { name: "All", value: "all" },
  { name: "Electronics", value: "electronics" },
  { name: "Women's Fashion", value: "womens-fashion" },
  { name: "Men's Fashion", value: "mens-fashion" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 fetch
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const url =
        category === "all"
          ? "https://your-api.com/products"
          : `https://your-api.com/products?category=${category}`;

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.data || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      {/* 🔥 Header زي Navbar style */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {category === "all"
            ? "All Products"
            : category.replace("-", " ")}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Discover our products in this category
        </p>
      </div>

      {/* 🔥 Categories نفس style navbar */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => router.push(`/products?category=${cat.value}`)}
            className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${category === cat.value
                ? "bg-green-100 text-green-600 font-medium"
                : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 🔥 Loading */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="bg-gray-200 h-40 rounded-xl" />
              <div className="bg-gray-200 h-4 w-3/4 rounded" />
              <div className="bg-gray-200 h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* 🔥 Empty */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found 😢
        </div>
      )}

      {/* 🔥 Products */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {products.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
            >
              {/* image */}
              <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                {p.imageCover ? (
                  <img
                    src={p.imageCover}
                    alt={p.name}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              {/* title */}
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {p.name}
              </h3>

              {/* price */}
              <p className="text-green-600 font-semibold mt-1">
                {p.price} EGP
              </p>

              {/* button */}
              <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
                Add to Cart
              </Button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}