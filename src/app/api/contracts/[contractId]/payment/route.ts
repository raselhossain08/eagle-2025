import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/config/auth.config";

export async function PUT(
  request: Request,
  { params }: { params: { contractId: string } }
) {
  try {
    // Get the contract ID from the route parameters
    const { contractId } = params;
    if (!contractId) {
      return NextResponse.json(
        { message: "Contract ID is required" },
        { status: 400 }
      );
    }

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

    // Parse request body
    const body = await request.json();
    const { paymentId, paymentProvider, status } = body;

    if (!paymentId || !paymentProvider || !status) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real application, you would update the contract in your database
    // For this example, we'll return a mock response
    
    // Mock updated contract data - in a real app, this would be updated in your database
    const updatedContract = {
      _id: contractId,
      userId: "user-123",
      name: "John Doe",
      email: "john@example.com",
      productType: "diamond",
      pdfPath: `contracts/diamond-john@example.com-${Date.now()}.pdf`,
      signedDate: new Date().toISOString(),
      status: status, // Updated status from the request
      paymentId: paymentId, // Payment ID from the request
      paymentProvider: paymentProvider, // Payment provider from the request
      subscriptionType: "monthly",
      subscriptionStartDate: new Date().toISOString(),
      subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: "Payment status updated successfully",
      data: updatedContract,
    });
  } catch (error: any) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update payment status" },
      { status: 500 }
    );
  }
}
