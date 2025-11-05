'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Download, Mail, CreditCard } from 'lucide-react';
import { Invoice, billingService } from '@/lib/services';

interface InvoiceDetailProps {
  invoiceId: string;
}

export function InvoiceDetail({ invoiceId }: InvoiceDetailProps) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await billingService.getInvoice(invoiceId);
        if (response.success && response.data) {
          setInvoice(response.data);
        } else {
          setError(response.error || 'Failed to fetch invoice');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await billingService.downloadInvoicePDF(invoiceId);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice?.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      await billingService.sendInvoiceEmail(invoiceId);
      // Show success message
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const getStatusColor = (status: Invoice['status']) => {
    const colors = {
      paid: 'bg-green-100 text-green-800 border-green-200',
      sent: 'bg-blue-100 text-blue-800 border-blue-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      overdue: 'bg-red-100 text-red-800 border-red-200',
      cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return colors[status] || colors.draft;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !invoice) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-red-500">{error || 'Invoice not found'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">
              Invoice #{invoice.invoiceNumber}
            </CardTitle>
            <CardDescription className="text-lg">
              {formatCurrency(invoice.total, invoice.currency)}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendEmail}>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          {invoice.status !== 'paid' && (
            <Button size="sm">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Invoice Information</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-500">Invoice Number:</span> {invoice.invoiceNumber}</p>
              <p><span className="text-gray-500">Issue Date:</span> {new Date(invoice.createdAt).toLocaleDateString()}</p>
              <p><span className="text-gray-500">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
              {invoice.paidAt && (
                <p><span className="text-gray-500">Paid Date:</span> {new Date(invoice.paidAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          {invoice.billingAddress && (
            <div>
              <h3 className="font-semibold mb-2">Billing Address</h3>
              <div className="text-sm text-gray-600">
                <p>{invoice.billingAddress.street}</p>
                <p>{invoice.billingAddress.city}, {invoice.billingAddress.state} {invoice.billingAddress.postalCode}</p>
                <p>{invoice.billingAddress.country}</p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Invoice Items */}
        <div>
          <h3 className="font-semibold mb-4">Items</h3>
          <div className="space-y-3">
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex-1">
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × {formatCurrency(item.unitPrice, invoice.currency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatCurrency(item.totalPrice, invoice.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Invoice Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
          </div>
          {invoice.taxAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>{formatCurrency(invoice.total, invoice.currency)}</span>
          </div>
        </div>

        {invoice.notes && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-600 text-sm">{invoice.notes}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}