import { NextRequest, NextResponse } from 'next/server';
import { Invoice, UpdateInvoiceRequest } from '@/lib/services/api/billing';

interface RouteParams {
  params: {
    invoiceId: string;
  };
}

// GET /api/billing/invoices/:invoiceId - Get specific invoice
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { invoiceId } = params;

    // TODO: Get customer ID from JWT token and verify ownership
    // const customerId = getUserIdFromToken(request);

    // Mock invoice data
    const mockInvoice: Invoice = {
      _id: invoiceId,
      invoiceNumber: "20240001",
      status: "paid",
      customerId: "cust_123",
      items: [
        {
          description: "Website Design",
          quantity: 1,
          unitPrice: 1000,
          totalPrice: 1000,
          taxable: true
        }
      ],
      subtotal: 1000,
      taxAmount: 100,
      total: 1100,
      currency: "USD",
      dueDate: "2024-01-15",
      paidAt: "2024-01-10",
      createdAt: "2024-01-01",
      billingAddress: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94105",
        country: "US"
      },
      notes: "Professional website design services"
    };

    // TODO: Fetch from database and verify customer ownership
    // if (mockInvoice.customerId !== customerId) {
    //   return NextResponse.json(
    //     { success: false, error: 'Invoice not found or access denied' },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({
      success: true,
      message: "Invoice retrieved successfully",
      data: mockInvoice,
    });

  } catch (error) {
    console.error('Error fetching invoice:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching invoice',
      },
      { status: 500 }
    );
  }
}

// PUT /api/billing/invoices/:invoiceId - Update invoice
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { invoiceId } = params;
    const updateData: UpdateInvoiceRequest = await request.json();

    // TODO: Get customer ID from JWT token and verify ownership
    // const customerId = getUserIdFromToken(request);

    // Mock current invoice data
    const currentInvoice: Invoice = {
      _id: invoiceId,
      invoiceNumber: "20240001",
      status: "draft",
      customerId: "cust_123",
      items: [
        {
          description: "Website Design",
          quantity: 1,
          unitPrice: 1000,
          totalPrice: 1000
        }
      ],
      subtotal: 1000,
      taxAmount: 100,
      total: 1100,
      currency: "USD",
      dueDate: "2024-01-15",
      createdAt: "2024-01-01"
    };

    // Validate that customer owns this invoice
    // TODO: Implement proper ownership check
    // if (currentInvoice.customerId !== customerId) {
    //   return NextResponse.json(
    //     { success: false, error: 'Invoice not found or access denied' },
    //     { status: 404 }
    //   );
    // }

    // Only allow updates to draft invoices
    if (currentInvoice.status !== 'draft') {
      return NextResponse.json(
        {
          success: false,
          error: 'Only draft invoices can be updated',
        },
        { status: 400 }
      );
    }

    // Update the invoice
    const updatedInvoice: Invoice = {
      ...currentInvoice,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    // TODO: Save to database
    console.log('Updated invoice:', updatedInvoice);

    return NextResponse.json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });

  } catch (error) {
    console.error('Error updating invoice:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while updating invoice',
      },
      { status: 500 }
    );
  }
}