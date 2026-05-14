"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaChartLine,
  FaDollarSign,
  FaPlusCircle,
  FaWarehouse,
} from "react-icons/fa";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useCatalog } from "@/contexts/CatalogContext";
import { buildPlaceholderImage, currency, mockOrders } from "@/lib/products";
import { Product } from "@/lib/types";

const DashboardPage = () => {
  const { isLoggedIn, user } = useAuth();
  const { products, addProduct } = useCatalog();
  const [form, setForm] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    stock: "",
    category: "New Arrival",
  });
  const [imageFileName, setImageFileName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const metrics = useMemo(() => {
    const totalRevenue = mockOrders.reduce(
      (sum, order) => sum + order.total,
      0,
    );
    const lowStockProducts = products.filter((product) => product.stock <= 5);
    return {
      totalProducts: products.length,
      totalOrders: mockOrders.length,
      totalRevenue,
      lowStockProducts,
    };
  }, [products]);

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="premium-card w-full rounded-[1.75rem] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Protected route
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Log in to access the dashboard
          </h1>
          <p className="mt-3 text-slate-600">
            The dashboard is available only after authentication, and it
            includes product KPIs, recent orders, and low stock alerts.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const price = Number(form.price);
      const stock = Number(form.stock);
      const fileInput = event.currentTarget.elements.namedItem(
        "imageFile",
      ) as HTMLInputElement | null;
      const file = fileInput?.files?.[0];

      let imageUrl = form.imageUrl.trim();

      if (!imageUrl && file) {
        imageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });
      }

      const newProduct: Omit<Product, "id"> = {
        name: form.name,
        price: Number.isFinite(price) ? price : 0,
        rating: 4.8,
        imageUrl: imageUrl || buildPlaceholderImage(form.name || "Bag"),
        stock: Number.isFinite(stock) ? stock : 0,
        category: form.category,
        description:
          form.description.trim() || "Added from the premium dashboard.",
      };

      addProduct(newProduct);
      setForm({
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        stock: "",
        category: "New Arrival",
      });
      setImageFileName("");
      event.currentTarget.reset();
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFileName(file?.name ?? "");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />

      <div className="space-y-8">
        <section className="premium-card rounded-[1.75rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                Admin dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Welcome back, {user?.name}
              </h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Track inventory, revenue, and recent activity for the LuxeBags
                collection. New products added here update the storefront
                instantly.
              </p>
            </div>
            <div className="rounded-2xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700">
              SHT Premium Control Center
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Products",
                value: metrics.totalProducts,
                icon: FaBoxOpen,
              },
              {
                label: "Total Orders",
                value: metrics.totalOrders,
                icon: FaChartLine,
              },
              {
                label: "Total Revenue",
                value: currency.format(metrics.totalRevenue),
                icon: FaDollarSign,
              },
              {
                label: "Low Stock",
                value: metrics.lowStockProducts.length,
                icon: FaWarehouse,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.4rem] border border-pink-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                  <item.icon className="text-2xl text-pink-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="premium-card rounded-[1.75rem] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                  Recent orders
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Latest activity
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {mockOrders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="rounded-[1.35rem] border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {order.id}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.date}
                      </p>
                    </div>
                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                    {order.items.map((item) => (
                      <span
                        key={item.id}
                        className="rounded-full bg-slate-100 px-3 py-1"
                      >
                        {item.name} x{item.quantity}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-right text-lg font-semibold text-slate-900">
                    {currency.format(order.total)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="premium-card rounded-[1.75rem] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                Low stock alerts
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Restock these items soon
              </h2>
              <div className="mt-6 space-y-3">
                {metrics.lowStockProducts.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No products are below the threshold.
                  </p>
                ) : (
                  metrics.lowStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-2xl bg-rose-50 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-slate-500">
                          {product.stock} remaining
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 font-semibold text-rose-600">
                        Low
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="premium-card rounded-[1.75rem] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <FaPlusCircle className="text-2xl text-pink-500" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                    Add product
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                    Create a new handbag
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Description
                  </span>
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Describe the bag, materials, and design details"
                    className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Price
                    </span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          price: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
                      required
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">
                      Stock
                    </span>
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          stock: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
                      required
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Upload bag image
                  </span>
                  <input
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-pink-50 file:px-4 file:py-2 file:font-semibold file:text-pink-600 hover:border-pink-300"
                  />
                  <p className="text-xs text-slate-500">
                    {imageFileName
                      ? `Selected file: ${imageFileName}`
                      : "Leave blank to use the image URL or a generated placeholder."}
                  </p>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Image URL
                  </span>
                  <input
                    value={form.imageUrl}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        imageUrl: event.target.value,
                      }))
                    }
                    placeholder="https://... or leave blank for a generated placeholder"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Category
                  </span>
                  <input
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="mt-6 w-full rounded-full bg-pink-500 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-300"
              >
                {isSaving ? "Saving product..." : "Add to catalog"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
