"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaSave, FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { isLoggedIn, user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        address: user.address,
      });
    }
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="premium-card w-full rounded-[1.75rem] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Profile
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Log in to edit your profile
          </h1>
          <p className="mt-3 text-slate-600">
            Profile details are persisted in localStorage and can be updated at
            any time.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="premium-card rounded-[1.75rem] p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-pink-500 to-rose-400 text-4xl text-white shadow-lg shadow-pink-200">
            <FaUserCircle />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Profile summary
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {user?.name}
            </h1>
            <p className="mt-1 text-slate-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 rounded-3xl bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Address</p>
            <p className="mt-1 font-medium text-slate-900">{user?.address}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Saved via</p>
            <p className="mt-1 font-medium text-slate-900">
              Local storage persistence
            </p>
          </div>
        </div>
      </section>

      <section className="premium-card rounded-[1.75rem] p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Editable profile
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Update your details
            </h2>
          </div>
          {saved && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">
              Full name
            </span>
            <input
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Address</span>
            <textarea
              rows={4}
              value={form.address}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  address: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.1)]"
              required
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
          >
            <FaSave />
            Save profile
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
