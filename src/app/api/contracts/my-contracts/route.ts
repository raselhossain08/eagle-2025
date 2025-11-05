import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/config/auth.config";

export async function GET(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // In a real application, you would query the database for the user's contracts
    // For this example, we'll return a mock response with sample contracts

    // Mock contracts data - in a real app, this would come from your database
    const mockContracts = [
      {
        _id: "contract-123456",
        userId: "user-123",
        name: "John Doe",
        email: "john@example.com",
        productType: "diamond",
        pdfPath: "contracts/diamond-john@example.com-1629456789.pdf",
        signedDate: new Date().toISOString(),
        status: "completed",
        paymentId: "pay-123456",
        paymentProvider: "stripe",
        subscriptionType: "monthly",
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "contract-654321",
        userId: "user-123",
        name: "John Doe",
        email: "john@example.com",
        productType: "infinity",
        pdfPath: "contracts/infinity-john@example.com-1629456790.pdf",
        signedDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
        status: "cancelled",
        paymentId: "pay-654321",
        paymentProvider: "paypal",
        subscriptionType: "monthly",
        subscriptionStartDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
        subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
        createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
        updatedAt: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
      },
    ];

    return NextResponse.json({
      message: "Contracts retrieved successfully",
      data: mockContracts,
    });
  } catch (error: any) {
    console.error("Error retrieving contracts:", error);
    return NextResponse.json(
      { message: error.message || "Failed to retrieve contracts" },
      { status: 500 }
    );
  }
}
