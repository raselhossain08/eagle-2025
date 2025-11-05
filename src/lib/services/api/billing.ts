import { api, ApiResponse, PaginatedResponse } from '../core/api-client';
import Cookies from 'js-cookie';

// Types and Interfaces
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxable?: boolean;
}

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CustomerLocation {
  country: string;
  region: string;
  postalCode: string;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  updatedAt?: string;
  billingAddress?: BillingAddress;
  notes?: string;
  paymentMethod?: string;
}

export interface InvoiceTemplate {
  _id: string;
  name: string;
  type: string;
  description: string;
  isDefault: boolean;
  previewUrl: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  isPrimary: boolean;
  isActive: boolean;
}

export interface TaxJurisdiction {
  country: string;
  region?: string;
  taxRate: number;
  taxName: string;
  isActive: boolean;
}

export interface CreateInvoiceRequest {
  customerId?: string; // Auto-filled from token
  items: InvoiceItem[];
  currency: string;
  dueDate: string;
  notes?: string;
  calculateTax?: boolean;
  billingAddress?: BillingAddress;
}

export interface UpdateInvoiceRequest {
  billingAddress?: BillingAddress;
  notes?: string;
  paymentMethod?: string;
}

export interface TaxCalculationRequest {
  amount: number;
  currency: string;
  customerLocation: CustomerLocation;
  items: InvoiceItem[];
}

export interface TaxCalculationResponse {
  subtotal: number;
  taxAmount: number;
  total: number;
  taxRate: number;
  jurisdiction: string;
  breakdown: {
    stateTax?: number;
    localTax?: number;
    federalTax?: number;
  };
}

export interface InvoicePagination {
  current: number;
  total: number;
  pages: number;
  limit: number;
}

export interface InvoiceHistoryResponse {
  invoices: Omit<Invoice, 'items'>[];
  pagination: InvoicePagination;
}

export interface InvoiceFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  page?: number;
  limit?: number;
}

export class BillingService {
  private readonly basePath = '/api/billing';

  constructor() {
    // No parent constructor needed
  }

  private getAuthToken(): string | undefined {
    return Cookies.get('token');
  }

  // Invoice Management
  async getInvoice(invoiceId: string): Promise<ApiResponse<Invoice>> {
    return api.get<ApiResponse<Invoice>>(`${this.basePath}/invoices/${invoiceId}`);
  }

  async getInvoiceHistory(filters?: InvoiceFilters): Promise<ApiResponse<InvoiceHistoryResponse>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${this.basePath}/invoices${params.toString() ? `?${params.toString()}` : ''}`;
    return api.get<ApiResponse<InvoiceHistoryResponse>>(url);
  }

  async createInvoice(invoiceData: CreateInvoiceRequest): Promise<ApiResponse<Invoice>> {
    return api.post<ApiResponse<Invoice>>(`${this.basePath}/invoices`, invoiceData);
  }

  async updateInvoice(invoiceId: string, updateData: UpdateInvoiceRequest): Promise<ApiResponse<Invoice>> {
    return api.put<ApiResponse<Invoice>>(`${this.basePath}/invoices/${invoiceId}`, updateData);
  }

  // Tax Calculation
  async calculateTax(taxData: TaxCalculationRequest): Promise<ApiResponse<TaxCalculationResponse>> {
    return api.post<ApiResponse<TaxCalculationResponse>>(`${this.basePath}/tax/calculate`, taxData);
  }

  async getTaxJurisdictions(country?: string, region?: string): Promise<ApiResponse<TaxJurisdiction[]>> {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (region) params.append('region', region);

    const url = `${this.basePath}/tax/jurisdictions${params.toString() ? `?${params.toString()}` : ''}`;
    return api.get<ApiResponse<TaxJurisdiction[]>>(url);
  }

  // Templates and Configuration
  async getInvoiceTemplates(): Promise<ApiResponse<InvoiceTemplate[]>> {
    return api.get<ApiResponse<InvoiceTemplate[]>>(`${this.basePath}/templates`);
  }

  async getSupportedCurrencies(): Promise<ApiResponse<Currency[]>> {
    return api.get<ApiResponse<Currency[]>>(`${this.basePath}/currencies`);
  }

  // Helper Methods
  async downloadInvoicePDF(invoiceId: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.basePath}/invoices/${invoiceId}/pdf`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error downloading invoice PDF:', error);
      throw error;
    }
  }

  async sendInvoiceEmail(invoiceId: string, emailAddress?: string): Promise<ApiResponse<{ sent: boolean }>> {
    return api.post<ApiResponse<{ sent: boolean }>>(`${this.basePath}/invoices/${invoiceId}/send`, {
      emailAddress,
    });
  }

  // Payment Processing
  async processPayment(invoiceId: string, paymentData: {
    paymentMethodId: string;
    amount: number;
    currency: string;
  }): Promise<ApiResponse<{ 
    success: boolean; 
    transactionId: string; 
    paidAt: string;
  }>> {
    return api.post<ApiResponse<{ 
      success: boolean; 
      transactionId: string; 
      paidAt: string;
    }>>(`${this.basePath}/invoices/${invoiceId}/pay`, paymentData);
  }

  // Utility Methods
  formatCurrency(amount: number, currencyCode: string): string {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount);
    } catch (error) {
      return `${currencyCode} ${amount.toFixed(2)}`;
    }
  }

  calculateSubtotal(items: InvoiceItem[]): number {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  }

  calculateItemTotal(quantity: number, unitPrice: number): number {
    return quantity * unitPrice;
  }

  validateInvoiceData(invoiceData: CreateInvoiceRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!invoiceData.items || invoiceData.items.length === 0) {
      errors.push('At least one item is required');
    }

    if (invoiceData.items) {
      invoiceData.items.forEach((item, index) => {
        if (!item.description?.trim()) {
          errors.push(`Item ${index + 1}: Description is required`);
        }
        if (item.quantity <= 0) {
          errors.push(`Item ${index + 1}: Quantity must be greater than 0`);
        }
        if (item.unitPrice <= 0) {
          errors.push(`Item ${index + 1}: Unit price must be greater than 0`);
        }
      });
    }

    if (!invoiceData.currency?.trim()) {
      errors.push('Currency is required');
    }

    if (!invoiceData.dueDate) {
      errors.push('Due date is required');
    } else {
      const dueDate = new Date(invoiceData.dueDate);
      const today = new Date();
      if (dueDate < today) {
        errors.push('Due date cannot be in the past');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Status helpers
  getInvoiceStatusColor(status: Invoice['status']): string {
    const statusColors = {
      draft: 'gray',
      sent: 'blue',
      paid: 'green',
      overdue: 'red',
      cancelled: 'gray',
    };
    return statusColors[status] || 'gray';
  }

  getInvoiceStatusLabel(status: Invoice['status']): string {
    const statusLabels = {
      draft: 'Draft',
      sent: 'Sent',
      paid: 'Paid',
      overdue: 'Overdue',
      cancelled: 'Cancelled',
    };
    return statusLabels[status] || status;
  }

  isInvoiceOverdue(invoice: Invoice): boolean {
    return invoice.status !== 'paid' && new Date(invoice.dueDate) < new Date();
  }

  getDaysUntilDue(dueDate: string): number {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

// Export singleton instance
export const billingService = new BillingService();

// Export helper functions for easier usage
export const getInvoice = (invoiceId: string) => billingService.getInvoice(invoiceId);
export const getInvoiceHistory = (filters?: InvoiceFilters) => billingService.getInvoiceHistory(filters);
export const createInvoice = (invoiceData: CreateInvoiceRequest) => billingService.createInvoice(invoiceData);
export const updateInvoice = (invoiceId: string, updateData: UpdateInvoiceRequest) => 
  billingService.updateInvoice(invoiceId, updateData);
export const calculateTax = (taxData: TaxCalculationRequest) => billingService.calculateTax(taxData);
export const getTaxJurisdictions = (country?: string, region?: string) => 
  billingService.getTaxJurisdictions(country, region);
export const getInvoiceTemplates = () => billingService.getInvoiceTemplates();
export const getSupportedCurrencies = () => billingService.getSupportedCurrencies();