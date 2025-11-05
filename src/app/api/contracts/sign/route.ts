import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/config/auth.config";

export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieJar = await cookies();
    const token = cookieJar.get("token")?.value;
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

    // Create a user ID for the contract
    // In a real app, this would come from the decoded token
    const userId = `user-${Date.now()}`;

    // Parse request body
    const body = await request.json();
    const { 
      name, 
      email, 
      signature, 
      productType, 
      pdfPath, 
      subscriptionType,
      amount,
      isDiamondContract,
      contractDate,
      productName 
    } = body;

    if (!name || !email || !signature || !productType || !pdfPath) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real application, you would save this data to a database
    // For this example, we'll mock a successful response with a dummy contract ID
    const dummyContractId = `contract-${Date.now()}`;

    // Simulate checking for existing contracts
    // In a real app, you would query your database for existing contracts
    const contractExists = false;
    
    if (contractExists) {
      return NextResponse.json(
        { 
          message: "Contract already exists for this product",
          data: {
            _id: dummyContractId,
            userId,
            name,
            email,
            signature,
            productType,
            pdfPath,
            signedDate: new Date().toISOString(),
            status: "signed",
            subscriptionType,
            subscriptionStartDate: new Date().toISOString(),
            subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } 
        },
        { status: 409 }
      );
    }

    // Mock saving the contract
    const signedContract = {
      _id: dummyContractId,
      userId,
      name,
      email,
      signature,
      productType,
      pdfPath,
      signedDate: new Date().toISOString(),
      status: "signed",
      subscriptionType,
      amount,
      isDiamondContract,
      contractDate,
      productName,
      subscriptionStartDate: new Date().toISOString(),
      subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Return success response
    return NextResponse.json({
      message: "Contract signed successfully",
      data: signedContract,
    });
  } catch (error: any) {
    console.error("Error signing contract:", error);
    return NextResponse.json(
      { message: error.message || "Failed to sign contract" },
      { status: 500 }
    );
  }
}
