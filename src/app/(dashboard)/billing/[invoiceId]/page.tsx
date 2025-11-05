import { InvoiceDetail } from '@/components/billing';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface InvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export async function generateMetadata({ params }: InvoicePageProps): Promise<Metadata> {
  return {
    title: `Invoice #${params.invoiceId} - Eagle Trading Platform`,
    description: 'View invoice details and manage payment',
  };
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const { invoiceId } = params;

  // Basic validation
  if (!invoiceId || typeof invoiceId !== 'string') {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <InvoiceDetail invoiceId={invoiceId} />
    </div>
  );
}