import { NextRequest, NextResponse } from 'next/server';
import { TaxCalculationRequest, TaxCalculationResponse } from '@/lib/services/api/billing';

// POST /api/billing/tax/calculate - Calculate tax for customer's location
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const taxData: TaxCalculationRequest = await request.json();

    // Validate required fields
    if (!taxData.amount || taxData.amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Valid amount is required',
        },
        { status: 400 }
      );
    }

    if (!taxData.currency) {
      return NextResponse.json(
        {
          success: false,
          error: 'Currency is required',
        },
        { status: 400 }
      );
    }

    if (!taxData.customerLocation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Customer location is required',
        },
        { status: 400 }
      );
    }

    if (!taxData.items || taxData.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least one item is required',
        },
        { status: 400 }
      );
    }

    // Mock tax calculation logic based on location
    let taxRate = 0;
    let jurisdiction = 'No Tax';
    let stateTax = 0;
    let localTax = 0;
    let federalTax = 0;

    const { country, region, postalCode } = taxData.customerLocation;

    // Tax calculation logic by location
    if (country === 'US') {
      jurisdiction = 'United States';
      
      // State tax rates (simplified)
      const stateTaxRates: Record<string, number> = {
        'CA': 0.075, // California
        'NY': 0.08,  // New York
        'TX': 0.0625, // Texas
        'FL': 0.06,  // Florida
        'WA': 0.065, // Washington
      };

      stateTax = stateTaxRates[region] || 0.05; // Default 5% if state not found
      
      // Local tax (simplified - based on postal code patterns)
      if (postalCode.startsWith('94')) { // San Francisco area
        localTax = 0.025;
      } else if (postalCode.startsWith('100')) { // NYC area
        localTax = 0.045;
      } else {
        localTax = 0.01; // Default local tax
      }

      taxRate = stateTax + localTax;
      
    } else if (country === 'CA') {
      jurisdiction = 'Canada';
      // Canadian tax rates (simplified)
      const provinceTaxRates: Record<string, number> = {
        'ON': 0.13, // Ontario HST
        'BC': 0.12, // British Columbia PST + GST
        'QC': 0.14975, // Quebec GST + QST
        'AB': 0.05, // Alberta GST only
      };
      
      taxRate = provinceTaxRates[region] || 0.05;
      federalTax = 0.05; // GST
      stateTax = taxRate - federalTax;
      
    } else if (country === 'GB') {
      jurisdiction = 'United Kingdom';
      taxRate = 0.20; // VAT
      
    } else if (country === 'DE') {
      jurisdiction = 'Germany';
      taxRate = 0.19; // VAT
      
    } else {
      taxRate = 0; // No tax for other countries
    }

    // Calculate tax only on taxable items
    const taxableAmount = taxData.items
      .filter(item => item.taxable !== false) // Default to taxable if not specified
      .reduce((sum, item) => sum + item.totalPrice, 0);

    const subtotal = taxData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxAmount = taxableAmount * taxRate;
    const total = subtotal + taxAmount;

    const response: TaxCalculationResponse = {
      subtotal,
      taxAmount: Math.round(taxAmount * 100) / 100, // Round to 2 decimal places
      total: Math.round(total * 100) / 100,
      taxRate: Math.round(taxRate * 10000) / 100, // Convert to percentage with 2 decimals
      jurisdiction,
      breakdown: {
        ...(stateTax > 0 && { stateTax: Math.round(taxableAmount * stateTax * 100) / 100 }),
        ...(localTax > 0 && { localTax: Math.round(taxableAmount * localTax * 100) / 100 }),
        ...(federalTax > 0 && { federalTax: Math.round(taxableAmount * federalTax * 100) / 100 }),
      },
    };

    return NextResponse.json({
      success: true,
      message: "Tax calculated successfully",
      data: response,
    });

  } catch (error) {
    console.error('Error calculating tax:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while calculating tax',
      },
      { status: 500 }
    );
  }
}