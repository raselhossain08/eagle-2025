import { InvoiceDetail } from '@/components/billing';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BasicInvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export async function generateMetadata({ params }: BasicInvoicePageProps): Promise<Metadata> {
  return {
    title: `Invoice #${params.invoiceId} - Basic Dashboard`,
    description: 'View invoice details and manage payment',
  };
}

export default function BasicInvoicePage({ params }: BasicInvoicePageProps) {
  const { invoiceId } = params;

  if (!invoiceId || typeof invoiceId !== 'string') {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Invoice Details</h1>
        <p className="mt-2 text-sm text-gray-400">
          View and manage your Basic subscription invoice
        </p>
      </div>
      <InvoiceDetail invoiceId={invoiceId} />
    </div>
  );
}