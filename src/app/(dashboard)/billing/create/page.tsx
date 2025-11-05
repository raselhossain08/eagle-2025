import { CreateInvoice } from '@/components/billing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice - Eagle Trading Platform',
  description: 'Create a new invoice for your services',
};

export default function CreateInvoicePage() {
  return (
    <div className="container mx-auto py-6">
      <CreateInvoice />
    </div>
  );
}