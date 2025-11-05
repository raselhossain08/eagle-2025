import { NextRequest, NextResponse } from 'next/server';
import { TaxJurisdiction } from '@/lib/services/api/billing';

// GET /api/billing/tax/jurisdictions - Get tax jurisdiction information
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const country = url.searchParams.get('country');
    const region = url.searchParams.get('region');

    // Mock tax jurisdictions data
    const allJurisdictions: TaxJurisdiction[] = [
      // United States
      { country: 'US', region: 'CA', taxRate: 10.0, taxName: 'California Sales Tax', isActive: true },
      { country: 'US', region: 'NY', taxRate: 8.0, taxName: 'New York Sales Tax', isActive: true },
      { country: 'US', region: 'TX', taxRate: 6.25, taxName: 'Texas Sales Tax', isActive: true },
      { country: 'US', region: 'FL', taxRate: 6.0, taxName: 'Florida Sales Tax', isActive: true },
      { country: 'US', region: 'WA', taxRate: 6.5, taxName: 'Washington Sales Tax', isActive: true },
      
      // Canada
      { country: 'CA', region: 'ON', taxRate: 13.0, taxName: 'Ontario HST', isActive: true },
      { country: 'CA', region: 'BC', taxRate: 12.0, taxName: 'BC PST + GST', isActive: true },
      { country: 'CA', region: 'QC', taxRate: 14.975, taxName: 'Quebec GST + QST', isActive: true },
      { country: 'CA', region: 'AB', taxRate: 5.0, taxName: 'Alberta GST', isActive: true },
      
      // United Kingdom
      { country: 'GB', taxRate: 20.0, taxName: 'UK VAT', isActive: true },
      
      // Germany
      { country: 'DE', taxRate: 19.0, taxName: 'German VAT', isActive: true },
      
      // France
      { country: 'FR', taxRate: 20.0, taxName: 'French VAT', isActive: true },
      
      // Australia
      { country: 'AU', taxRate: 10.0, taxName: 'Australian GST', isActive: true },
      
      // European Union (sample countries)
      { country: 'ES', taxRate: 21.0, taxName: 'Spanish VAT', isActive: true },
      { country: 'IT', taxRate: 22.0, taxName: 'Italian VAT', isActive: true },
      { country: 'NL', taxRate: 21.0, taxName: 'Netherlands VAT', isActive: true },
    ];

    // Filter jurisdictions based on query parameters
    let filteredJurisdictions = allJurisdictions.filter(j => j.isActive);

    if (country) {
      filteredJurisdictions = filteredJurisdictions.filter(
        j => j.country.toLowerCase() === country.toLowerCase()
      );
    }

    if (region && country) {
      filteredJurisdictions = filteredJurisdictions.filter(
        j => j.region?.toLowerCase() === region.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tax jurisdictions retrieved successfully",
      data: filteredJurisdictions,
    });

  } catch (error) {
    console.error('Error fetching tax jurisdictions:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching tax jurisdictions',
      },
      { status: 500 }
    );
  }
}