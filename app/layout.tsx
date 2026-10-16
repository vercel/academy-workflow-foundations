import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sal's Pizza",
  description: "Order a pizza. Watch a workflow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-stone-300 bg-white">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--pizza-red)" }}
            >
              Sal&apos;s Pizza
            </Link>
            <div className="flex gap-4 text-sm text-stone-600">
              <Link href="/kitchen" className="hover:text-stone-900">
                Kitchen
              </Link>
              <Link href="/driver" className="hover:text-stone-900">
                Driver
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
