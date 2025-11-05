import { NextRequest, NextResponse } from 'next/server';
import { InvoiceTemplate } from '@/lib/services/api/billing';

// GET /api/billing/templates - Get available invoice templates
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Mock invoice templates data
    const templates: InvoiceTemplate[] = [
      {
        _id: "tpl_001",
        name: "Standard Invoice",
        type: "standard",
        description: "Default invoice template with clean design",
        isDefault: true,
        previewUrl: "/templates/standard-preview.jpg"
      },
      {
        _id: "tpl_002",
        name: "Professional",
        type: "professional",
        description: "Professional business template with company branding",
        isDefault: false,
        previewUrl: "/templates/professional-preview.jpg"
      },
      {
        _id: "tpl_003",
        name: "Modern",
        type: "modern",
        description: "Contemporary design with bold typography",
        isDefault: false,
        previewUrl: "/templates/modern-preview.jpg"
      },
      {
        _id: "tpl_004",
        name: "Minimal",
        type: "minimal",
        description: "Clean and simple minimalist design",
        isDefault: false,
        previewUrl: "/templates/minimal-preview.jpg"
      },
      {
        _id: "tpl_005",
        name: "Corporate",
        type: "corporate",
        description: "Formal corporate template for enterprise use",
        isDefault: false,
        previewUrl: "/templates/corporate-preview.jpg"
      }
    ];

    return NextResponse.json({
      success: true,
      message: "Invoice templates retrieved successfully",
      data: templates,
    });

  } catch (error) {
    console.error('Error fetching invoice templates:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching templates',
      },
      { status: 500 }
    );
  }
}