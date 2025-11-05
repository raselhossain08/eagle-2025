import { InvoiceList } from '@/components/billing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing & Invoices - Eagle Trading Platform',
  description: 'Manage your billing, invoices, and payment history',
};

export default function BillingPage() {
  return (
    <div className="container mx-auto py-6">
      <InvoiceList />
    </div>
  );
}