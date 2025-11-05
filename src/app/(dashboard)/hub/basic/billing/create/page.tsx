import { CreateInvoice } from '@/components/billing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice - Basic Dashboard',
  description: 'Create a new invoice for your services',
};

export default function BasicCreateInvoicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Create Invoice</h1>
        <p className="mt-2 text-sm text-gray-400">
          Generate a new invoice for Basic subscription services
        </p>
      </div>
      <CreateInvoice />
    </div>
  );
}