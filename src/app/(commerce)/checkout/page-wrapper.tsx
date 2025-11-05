"use client";

import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CheckoutContent from "./checkout-content";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading checkout...
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
