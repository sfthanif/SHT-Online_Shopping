"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

import { useUiStore } from "@/store/ui-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Toast } from "@/components/ui/toast";

export function AuthModal() {
  const open = useUiStore((state) => state.authModalOpen);
  const close = useUiStore((state) => state.closeAuthModal);

  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const title = useMemo(() => {
    if (mode === "register") return "Create ROSEQUI Account";
    if (mode === "forgot") return "Forgot Password";
    return "Welcome Back";
  }, [mode]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ open: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 2200);
  };

  return (
    <>
      <Modal open={open} title={title} onClose={close}>
        <div className="space-y-4">
          {mode === "register" ? (
            <Input placeholder="Full name" aria-label="Full name" />
          ) : null}
          <Input placeholder="Email" aria-label="Email" type="email" />

          {mode !== "forgot" ? (
            <label className="relative block">
              <Input
                placeholder="Password"
                aria-label="Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                className="absolute right-3 top-3 text-rose/70"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </label>
          ) : null}

          {mode === "register" ? (
            <Input placeholder="Confirm password" type="password" />
          ) : null}

          {mode === "register" ? (
            <div className="h-2 overflow-hidden rounded-full bg-pearl">
              <div className="h-full w-2/3 bg-gold-gradient" />
            </div>
          ) : null}

          <Button
            className="w-full"
            onClick={async () => {
              if (mode === "forgot") {
                showToast("Password reset link sent.", "success");
                return;
              }

              if (mode === "register") {
                showToast("Account created. Please log in.", "success");
                setMode("login");
                return;
              }

              const result = await signIn("credentials", {
                redirect: false,
                email: "demo@rosequi.com",
                password: "demo12345",
              });
              if (result?.ok) {
                showToast("Signed in successfully.", "success");
                close();
              } else {
                showToast("Invalid credentials.", "error");
              }
            }}
          >
            {mode === "login"
              ? "Sign In"
              : mode === "register"
                ? "Create Account"
                : "Send Link"}
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary" onClick={() => signIn("google")}>
              Google
            </Button>
            <Button variant="secondary" onClick={() => signIn("facebook")}>
              Facebook
            </Button>
            <Button variant="secondary" onClick={() => signIn("apple")}>
              Apple
            </Button>
          </div>

          <div className="flex flex-wrap justify-between gap-2 font-ui text-[11px] uppercase tracking-[0.14em] text-rose/80">
            {mode !== "login" ? (
              <button onClick={() => setMode("login")}>Back to login</button>
            ) : (
              <button onClick={() => setMode("forgot")}>Forgot password</button>
            )}
            {mode !== "register" ? (
              <button onClick={() => setMode("register")}>
                Create account
              </button>
            ) : null}
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} open={toast.open} type={toast.type} />
    </>
  );
}
