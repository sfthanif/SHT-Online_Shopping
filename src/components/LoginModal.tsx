"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (open) {
      setPassword("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-pink-100 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/85">
                Secure sign in
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                Welcome to LuxeBags
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/15 p-2 transition hover:bg-white/25"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50/70 px-4 py-3 text-sm text-slate-600">
            <FaUserCircle className="text-xl text-pink-500" />
            <span>Use any email and password to enter the demo store.</span>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.12)]"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Any password works"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-pink-400 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.12)]"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-pink-500 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
