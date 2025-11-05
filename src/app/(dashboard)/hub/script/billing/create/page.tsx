"use client";

import { CreateInvoice } from "@/components/billing/CreateInvoice";

export default function ScriptCreateInvoicePage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create New Invoice</h1>
        <p className="text-gray-400 mt-2">
          Create a new invoice for your Script subscription
        </p>
      </div>

      <CreateInvoice />
    </div>
  );
}