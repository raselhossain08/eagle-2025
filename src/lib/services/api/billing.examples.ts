/**
 * Billing Service Usage Examples
 * 
 * This file demonstrates how to use the billing service
 * for invoice management, tax calculations, and payment processing.
 */

import React from 'react';
import {
  billingService,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  TaxCalculationRequest,
  InvoiceFilters,
  Invoice,
  TaxCalculationResponse,
  InvoiceHistoryResponse,
} from '@/lib/services/api/billing';

// 1. Get invoice history with filters
export async function getInvoiceHistoryExample() {
  const filters: InvoiceFilters = {
    status: 'paid',
    currency: 'USD',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    page: 1,
    limit: 10,
  };

  const response = await billingService.getInvoiceHistory(filters);
  
  if (response.success && response.data) {
    console.log('Invoices:', response.data.invoices);
    console.log('Pagination:', response.data.pagination);
  }
}

// 2. Get specific invoice
export async function getInvoiceExample(invoiceId: string) {
  const response = await billingService.getInvoice(invoiceId);
  
  if (response.success && response.data) {
    console.log('Invoice details:', response.data);
    
    // Check if overdue
    const isOverdue = billingService.isInvoiceOverdue(response.data);
    console.log('Is overdue:', isOverdue);
    
    // Get days until due
    const daysUntilDue = billingService.getDaysUntilDue(response.data.dueDate);
    console.log('Days until due:', daysUntilDue);
  }
}

// 3. Create a new invoice
export async function createInvoiceExample() {
  const invoiceData: CreateInvoiceRequest = {
    items: [
      {
        description: 'Premium Plan - Monthly',
        quantity: 1,
        unitPrice: 49.99,
        totalPrice: 49.99,
        taxable: true,
      },
      {
        description: 'Setup Fee',
        quantity: 1,
        unitPrice: 25.00,
        totalPrice: 25.00,
        taxable: true,
      },
    ],
    currency: 'USD',
    dueDate: '2024-02-01',
    notes: 'Self-service purchase - Premium subscription',
    calculateTax: true,
    billingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
    },
  };

  // Validate before creating
  const validation = billingService.validateInvoiceData(invoiceData);
  if (!validation.isValid) {
    console.error('Validation errors:', validation.errors);
    return;
  }

  const response = await billingService.createInvoice(invoiceData);
  
  if (response.success && response.data) {
    console.log('Invoice created:', response.data);
  }
}

// 4. Update invoice details
export async function updateInvoiceExample(invoiceId: string) {
  const updateData: UpdateInvoiceRequest = {
    billingAddress: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90210',
      country: 'US',
    },
    notes: 'Updated billing information',
    paymentMethod: 'credit_card',
  };

  const response = await billingService.updateInvoice(invoiceId, updateData);
  
  if (response.success && response.data) {
    console.log('Invoice updated:', response.data);
  }
}

// 5. Calculate tax for different locations
export async function calculateTaxExample() {
  // US customer
  const usTaxData: TaxCalculationRequest = {
    amount: 1000,
    currency: 'USD',
    customerLocation: {
      country: 'US',
      region: 'CA',
      postalCode: '94105',
    },
    items: [
      {
        description: 'Web Service',
        quantity: 1,
        unitPrice: 1000,
        totalPrice: 1000,
        taxable: true,
      },
    ],
  };

  const usResponse = await billingService.calculateTax(usTaxData);
  if (usResponse.success && usResponse.data) {
    console.log('US Tax calculation:', usResponse.data);
  }

  // Canadian customer
  const canadaTaxData: TaxCalculationRequest = {
    amount: 1000,
    currency: 'CAD',
    customerLocation: {
      country: 'CA',
      region: 'ON',
      postalCode: 'M5V3A8',
    },
    items: [
      {
        description: 'Consulting Service',
        quantity: 10,
        unitPrice: 100,
        totalPrice: 1000,
        taxable: true,
      },
    ],
  };

  const canadaResponse = await billingService.calculateTax(canadaTaxData);
  if (canadaResponse.success && canadaResponse.data) {
    console.log('Canada Tax calculation:', canadaResponse.data);
  }
}

// 6. Get tax jurisdictions
export async function getTaxJurisdictionsExample() {
  // Get all jurisdictions
  const allResponse = await billingService.getTaxJurisdictions();
  
  // Get US jurisdictions only
  const usResponse = await billingService.getTaxJurisdictions('US');
  
  // Get specific state
  const caResponse = await billingService.getTaxJurisdictions('US', 'CA');
  
  console.log('All jurisdictions:', allResponse.data);
  console.log('US jurisdictions:', usResponse.data);
  console.log('California jurisdiction:', caResponse.data);
}

// 7. Get configuration data
export async function getConfigurationExample() {
  // Get invoice templates
  const templatesResponse = await billingService.getInvoiceTemplates();
  if (templatesResponse.success && templatesResponse.data) {
    console.log('Available templates:', templatesResponse.data);
  }

  // Get supported currencies
  const currenciesResponse = await billingService.getSupportedCurrencies();
  if (currenciesResponse.success && currenciesResponse.data) {
    console.log('Supported currencies:', currenciesResponse.data);
  }
}

// 8. Download and email invoice
export async function invoiceActionsExample(invoiceId: string) {
  try {
    // Download PDF
    const pdfBlob = await billingService.downloadInvoicePDF(invoiceId);
    const url = URL.createObjectURL(pdfBlob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Send email
    const emailResponse = await billingService.sendInvoiceEmail(invoiceId);
    if (emailResponse.success) {
      console.log('Invoice email sent successfully');
    }
  } catch (error) {
    console.error('Error with invoice actions:', error);
  }
}

// 9. Process payment
export async function processPaymentExample(invoiceId: string) {
  const paymentData = {
    paymentMethodId: 'pm_1234567890',
    amount: 1100,
    currency: 'USD',
  };

  const response = await billingService.processPayment(invoiceId, paymentData);
  
  if (response.success && response.data) {
    console.log('Payment processed:', response.data);
  }
}

// 10. Utility functions examples
export function utilityFunctionsExample() {
  // Format currency
  const formatted = billingService.formatCurrency(1234.56, 'USD');
  console.log('Formatted currency:', formatted); // $1,234.56

  // Calculate item total
  const itemTotal = billingService.calculateItemTotal(3, 25.99);
  console.log('Item total:', itemTotal); // 77.97

  // Calculate subtotal from items
  const items = [
    { description: 'Item 1', quantity: 2, unitPrice: 25.00, totalPrice: 50.00 },
    { description: 'Item 2', quantity: 1, unitPrice: 75.00, totalPrice: 75.00 },
  ];
  const subtotal = billingService.calculateSubtotal(items);
  console.log('Subtotal:', subtotal); // 125.00

  // Status helpers
  const statusColor = billingService.getInvoiceStatusColor('paid');
  const statusLabel = billingService.getInvoiceStatusLabel('paid');
  console.log('Status color:', statusColor);
  console.log('Status label:', statusLabel);
}

// 11. React Hook for invoice management
export function useInvoiceManagement() {
  const [invoices, setInvoices] = React.useState<Omit<Invoice, 'items'>[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchInvoices = React.useCallback(async (filters?: InvoiceFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await billingService.getInvoiceHistory(filters);
      if (response.success && response.data) {
        setInvoices(response.data.invoices);
      } else {
        setError(response.error || 'Failed to fetch invoices');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createInvoice = React.useCallback(async (invoiceData: CreateInvoiceRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await billingService.createInvoice(invoiceData);
      if (response.success) {
        // Refresh invoice list
        fetchInvoices();
        return response.data;
      } else {
        setError(response.error || 'Failed to create invoice');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchInvoices]);

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    createInvoice,
  };
}

// 12. React Hook for tax calculation
export function useTaxCalculation() {
  const [taxResult, setTaxResult] = React.useState<TaxCalculationResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const calculateTax = React.useCallback(async (taxData: TaxCalculationRequest) => {
    setLoading(true);
    
    try {
      const response = await billingService.calculateTax(taxData);
      if (response.success && response.data) {
        setTaxResult(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Tax calculation error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearTaxResult = React.useCallback(() => {
    setTaxResult(null);
  }, []);

  return {
    taxResult,
    loading,
    calculateTax,
    clearTaxResult,
  };
}