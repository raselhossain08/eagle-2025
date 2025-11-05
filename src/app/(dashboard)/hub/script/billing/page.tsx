"use client";

import { InvoiceList } from "@/components/billing/InvoiceList";

export default function ScriptBillingPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Billing & Invoices</h1>
        <p className="text-gray-400 mt-2">
          Manage your invoices and billing information for your Script subscription
        </p>
      </div>

      <InvoiceList />
    </div>
  );
}