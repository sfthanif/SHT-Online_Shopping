"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthUser, UserProfile } from "@/lib/types";

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
};

const AUTH_KEY = "sht_luxebags_auth_user";
const defaultAddress = "122 Pink Avenue, Mumbai, India";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createUserFromEmail = (email: string): AuthUser => {
  const safeEmail = email.trim() || "guest@example.com";
  const namePart = safeEmail.split("@")[0] || "Guest";
  const formattedName = namePart
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return {
    name: formattedName || "Guest Shopper",
    email: safeEmail,
    address: defaultAddress,
    avatarSeed: safeEmail,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as AuthUser);
      } catch {
        window.localStorage.removeItem(AUTH_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_KEY);
    }
  }, [hydrated, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      isLoggedIn: Boolean(user),
      login: (email: string) => setUser(createUserFromEmail(email)),
      logout: () => setUser(null),
      updateProfile: (profile: UserProfile) => {
        setUser((current) => {
          const seed = current?.avatarSeed ?? profile.email;
          return {
            ...profile,
            avatarSeed: seed,
          };
        });
      },
    }),
    [hydrated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
