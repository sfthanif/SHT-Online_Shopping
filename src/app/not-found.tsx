import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="ui-label">404</p>
      <h1 className="mt-3 font-heading text-6xl text-rose">Page Not Found</h1>
      <p className="mt-3 font-body text-2xl text-rose/80">
        The page you requested does not exist.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back Home</Button>
      </Link>
    </main>
  );
}
