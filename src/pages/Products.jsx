import { useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

function Products() {
  const { data, loading, error, refetch } = useFetch(
    import.meta.env.VITE_PRODUCTS_API_URL
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = [
    "All",
    ...new Set(data.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = useMemo(() => {
    let result = data.filter((product) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    } else if (sortBy === "high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [data, search, category, sortBy]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mt-2 text-slate-500">
        Browse products loaded from the API.
      </p>

      <div className="my-6 grid gap-3 md:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="w-full py-3 outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <option value="default">Default order</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

          <button
            onClick={refetch}
            aria-label="Refresh products"
            className="rounded-xl bg-indigo-600 px-4 text-white hover:bg-indigo-700"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="rounded-xl bg-red-50 p-5 text-red-700">
          {error}
        </p>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold">
            No products found
          </h2>
          <p className="mt-2 text-slate-500">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-52 items-center justify-center bg-white p-5">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full max-w-full object-contain"
                />
              </div>

              <div className="p-5">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
                  {product.category}
                </span>

                <h2 className="mt-4 line-clamp-2 min-h-12 font-semibold">
                  {product.title}
                </h2>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xl font-bold text-indigo-700">
                    ${Number(product.price).toFixed(2)}
                  </span>

                  <span className="text-sm text-slate-500">
                    ⭐ {product.rating?.rate ?? "N/A"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && (
        <p className="mt-5 text-sm text-slate-500">
          Showing {filteredProducts.length} products
        </p>
      )}
    </div>
  );
}

export default Products;