import { NextRequest, NextResponse } from 'next/server';
import { Invoice, InvoiceHistoryResponse, CreateInvoiceRequest } from '@/lib/services/api/billing';

// GET /api/billing/invoices - Get customer's invoice history
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const minAmount = url.searchParams.get('minAmount');
    const maxAmount = url.searchParams.get('maxAmount');
    const currency = url.searchParams.get('currency');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // TODO: Get customer ID from JWT token
    // const customerId = getUserIdFromToken(request);

    // Mock data for demonstration
    const mockInvoices = [
      {
        _id: "inv_123456",
        invoiceNumber: "20240001",
        status: "paid" as const,
        customerId: "cust_123",
        subtotal: 1000,
        taxAmount: 100,
        total: 1100,
        currency: "USD",
        dueDate: "2024-01-15",
        paidAt: "2024-01-10",
        createdAt: "2024-01-01"
      },
      {
        _id: "inv_123457",
        invoiceNumber: "20240002",
        status: "sent" as const,
        customerId: "cust_123",
        subtotal: 2273,
        taxAmount: 227,
        total: 2500,
        currency: "USD",
        dueDate: "2024-02-15",
        createdAt: "2024-02-01"
      },
    ];

    // Apply filters (in real implementation, this would be done in database query)
    let filteredInvoices = mockInvoices;
    
    if (status) {
      filteredInvoices = filteredInvoices.filter(inv => inv.status === status);
    }
    
    if (currency) {
      filteredInvoices = filteredInvoices.filter(inv => inv.currency === currency);
    }

    if (minAmount) {
      filteredInvoices = filteredInvoices.filter(inv => inv.total >= parseFloat(minAmount));
    }

    if (maxAmount) {
      filteredInvoices = filteredInvoices.filter(inv => inv.total <= parseFloat(maxAmount));
    }

    // Pagination
    const total = filteredInvoices.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

    const response: InvoiceHistoryResponse = {
      invoices: paginatedInvoices,
      pagination: {
        current: page,
        total,
        pages,
        limit,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Invoices retrieved successfully",
      data: response,
    });

  } catch (error) {
    console.error('Error fetching invoices:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching invoices',
      },
      { status: 500 }
    );
  }
}

// POST /api/billing/invoices - Create invoice
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const invoiceData: CreateInvoiceRequest = await request.json();

    // TODO: Get customer ID from JWT token
    // const customerId = getUserIdFromToken(request);
    const customerId = "cust_123"; // Mock customer ID

    // Validate required fields
    if (!invoiceData.items || invoiceData.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least one item is required',
        },
        { status: 400 }
      );
    }

    if (!invoiceData.currency) {
      return NextResponse.json(
        {
          success: false,
          error: 'Currency is required',
        },
        { status: 400 }
      );
    }

    if (!invoiceData.dueDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Due date is required',
        },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    let taxAmount = 0;

    // Calculate tax if requested
    if (invoiceData.calculateTax) {
      taxAmount = subtotal * 0.1; // Mock 10% tax rate
    }

    const total = subtotal + taxAmount;

    // Create invoice (mock implementation)
    const newInvoice: Invoice = {
      _id: `inv_${Date.now()}`,
      invoiceNumber: `${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      status: 'draft',
      customerId,
      items: invoiceData.items,
      subtotal,
      taxAmount,
      total,
      currency: invoiceData.currency,
      dueDate: invoiceData.dueDate,
      createdAt: new Date().toISOString(),
      notes: invoiceData.notes,
      billingAddress: invoiceData.billingAddress,
    };

    // TODO: Save to database
    console.log('Created invoice:', newInvoice);

    return NextResponse.json({
      success: true,
      message: "Invoice created successfully",
      data: newInvoice,
    });

  } catch (error) {
    console.error('Error creating invoice:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while creating invoice',
      },
      { status: 500 }
    );
  }
}