import { InvoiceList } from '@/components/billing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing & Invoices - Basic Dashboard',
  description: 'Manage your billing, invoices, and payment history',
};

export default function BasicBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Billing & Invoices</h1>
        <p className="mt-2 text-sm text-gray-400">
          Manage your Basic subscription billing and invoice history
        </p>
      </div>
      <InvoiceList />
    </div>
  );
}