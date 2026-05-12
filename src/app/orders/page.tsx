"use client";

import { useAuth } from "@/contexts/AuthContext";
import { currency, mockOrders } from "@/lib/products";

const OrdersPage = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="premium-card w-full rounded-[1.75rem] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Orders
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Please log in to view your order history
          </h1>
          <p className="mt-3 text-slate-600">
            Orders are stored as mock data for the signed-in demo user.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="premium-card rounded-[1.75rem] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
          Order history
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Your recent orders
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Review the latest mock orders, including item breakdown, totals,
          dates, and delivery status.
        </p>
      </div>

      <div className="grid gap-5">
        {mockOrders.map((order) => (
          <article key={order.id} className="premium-card rounded-[1.5rem] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{order.id}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Placed on {order.date}
                </p>
              </div>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                {order.status}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-white p-4"
                >
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.quantity} x {currency.format(item.price)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <p className="text-slate-500">
                Total items: {order.items.length}
              </p>
              <p className="text-xl font-semibold text-slate-900">
                {currency.format(order.total)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
