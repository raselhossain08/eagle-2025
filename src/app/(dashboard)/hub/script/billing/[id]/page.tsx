"use client";

import { InvoiceDetail } from "@/components/billing/InvoiceDetail";

interface Props {
  params: {
    id: string;
  };
}

export default function ScriptInvoiceDetailPage({ params }: Props) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Invoice Details</h1>
        <p className="text-gray-400 mt-2">
          View and manage invoice #{params.id} for your Script subscription
        </p>
      </div>

      <InvoiceDetail invoiceId={params.id} />
    </div>
  );
}