import { NextRequest, NextResponse } from 'next/server';
import { Currency } from '@/lib/services/api/billing';

// GET /api/billing/currencies - Get supported currencies
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Mock supported currencies data
    const currencies: Currency[] = [
      {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        exchangeRate: 1.0,
        isPrimary: true,
        isActive: true
      },
      {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        exchangeRate: 0.85,
        isPrimary: false,
        isActive: true
      },
      {
        code: "GBP",
        name: "British Pound",
        symbol: "£",
        exchangeRate: 0.75,
        isPrimary: false,
        isActive: true
      },
      {
        code: "CAD",
        name: "Canadian Dollar",
        symbol: "C$",
        exchangeRate: 1.25,
        isPrimary: false,
        isActive: true
      },
      {
        code: "AUD",
        name: "Australian Dollar",
        symbol: "A$",
        exchangeRate: 1.35,
        isPrimary: false,
        isActive: true
      },
      {
        code: "JPY",
        name: "Japanese Yen",
        symbol: "¥",
        exchangeRate: 110.0,
        isPrimary: false,
        isActive: true
      },
      {
        code: "CHF",
        name: "Swiss Franc",
        symbol: "CHF",
        exchangeRate: 0.92,
        isPrimary: false,
        isActive: true
      },
      {
        code: "SEK",
        name: "Swedish Krona",
        symbol: "kr",
        exchangeRate: 8.5,
        isPrimary: false,
        isActive: true
      },
      {
        code: "NOK",
        name: "Norwegian Krone",
        symbol: "kr",
        exchangeRate: 8.8,
        isPrimary: false,
        isActive: true
      },
      {
        code: "DKK",
        name: "Danish Krone",
        symbol: "kr",
        exchangeRate: 6.3,
        isPrimary: false,
        isActive: true
      },
      {
        code: "NZD",
        name: "New Zealand Dollar",
        symbol: "NZ$",
        exchangeRate: 1.45,
        isPrimary: false,
        isActive: true
      },
      {
        code: "SGD",
        name: "Singapore Dollar",
        symbol: "S$",
        exchangeRate: 1.35,
        isPrimary: false,
        isActive: true
      },
      {
        code: "HKD",
        name: "Hong Kong Dollar",
        symbol: "HK$",
        exchangeRate: 7.8,
        isPrimary: false,
        isActive: true
      }
    ];

    // Filter only active currencies
    const activeCurrencies = currencies.filter(currency => currency.isActive);

    // Sort with primary currency first, then alphabetically
    activeCurrencies.sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({
      success: true,
      message: "Currencies retrieved successfully",
      data: activeCurrencies,
    });

  } catch (error) {
    console.error('Error fetching currencies:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching currencies',
      },
      { status: 500 }
    );
  }
}