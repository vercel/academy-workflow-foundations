"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function OrderStatusRefresher() {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), 2000);
    return () => clearInterval(id);
  }, [router]);
  return null;
}
