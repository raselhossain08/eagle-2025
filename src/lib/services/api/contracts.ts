import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface SignedContractData {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  streetAddress?: string;
  flatSuiteUnit?: string;
  townCity?: string;
  stateCounty?: string;
  postcodeZip?: string;
  discordUsername?: string;
  signature: string;
  productType: string;
  subscriptionType?: "monthly" | "yearly";
  amount?: number;
  isDiamondContract?: boolean;
  contractDate?: string;
  productName?: string;
}

export interface ContractData {
  name: string;
  email?: string;
  date: Date;
  signature: string;
  price?: string;
  productName?: string;
}

// Remove PDF generation functions as backend no longer generates PDFs

export interface SignedContract {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  streetAddress?: string;
  flatSuiteUnit?: string;
  townCity?: string;
  stateCounty?: string;
  postcodeZip?: string;
  discordUsername?: string;
  signature: string;
  productType: string;
  signedDate: string;
  status: "signed" | "payment_pending" | "completed" | "cancelled";
  paymentId?: string;
  paymentProvider?: "paypal" | "stripe";
  subscriptionEndDate?: string;
  subscriptionStartDate?: string;
  subscriptionType?: "monthly" | "yearly";
  amount?: number;
  isDiamondContract?: boolean;
  contractDate?: string;
  productName?: string;
  createdAt: string;
  updatedAt: string;
  isExisting?: boolean;
}

// Create contract with contact info (for guest users)
export interface CreateContractWithContactData {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  streetAddress: string;
  flatSuiteUnit?: string;
  townCity: string;
  stateCounty: string;
  postcodeZip: string;
  discordUsername?: string;
  signature: string;
  productType: string;
  subscriptionType?: "monthly" | "yearly";
  contractData?: any;
}

export const createContractWithContact = async (
  contractData: CreateContractWithContactData
): Promise<{
  contract: SignedContract;
  contractId: string;
  message: string;
  userCreationStatus: string;
}> => {
  const response = await fetch(`${API_URL}/contracts/create-with-contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle validation errors
    if (data.errors && Array.isArray(data.errors)) {
      const error = new Error(data.message || "Validation failed") as any;
      error.validationErrors = data.errors;
      throw error;
    }

    // Handle active subscription error
    if (
      data.message ===
      "You already have an active subscription for this product"
    ) {
      const error = new Error(data.message) as any;
      error.hasActiveSubscription = true;
      throw error;
    }

    throw new Error(data.message || "Failed to create contract");
  }

  return {
    contract: data.data.contract,
    contractId: data.data.contractId,
    message: data.message,
    userCreationStatus: data.data.userCreationStatus,
  };
};

// Sign contract
export const signContract = async (
  contractData: SignedContractData
): Promise<SignedContract> => {
  const token = Cookies.get("token");

  // Log what we're sending
  console.log("🔍 Signing contract with data:", {
    productType: contractData.productType,
    subscriptionType: contractData.subscriptionType,
    name: contractData.name,
    email: contractData.email,
  });

  const response = await fetch(`${API_URL}/contracts/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contractData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Contract signing failed:", data);
    // Special handling for "Contract already exists" case (legacy error handling)
    if (
      data.message === "Contract already exists for this product" &&
      data.data
    ) {
      // Create a custom error that includes the existing contract data
      const error = new Error(data.message) as any;
      error.existingContract = data.data;
      throw error;
    }

    // Special handling for active subscription error
    if (
      data.message ===
      "You already have an active subscription for this product"
    ) {
      const error = new Error(data.message) as any;
      error.hasActiveSubscription = true;
      error.existingContract = data.data;
      throw error;
    }

    throw new Error(data.message || "Failed to sign contract");
  }

  // Check if this is an existing contract response
  if (data.existingContract) {
    // For existing contracts, we still return the contract data
    // but we can add a flag to indicate it was existing
    const contract = data.data;
    contract.isExisting = true;
    return contract;
  }

  return data.data;
};

// Update payment status
export const updatePaymentStatus = async (
  contractId: string,
  paymentData: {
    paymentId: string;
    paymentProvider: "paypal" | "stripe";
    status: "completed" | "cancelled";
  }
): Promise<SignedContract> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/${contractId}/payment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update payment status");
  }

  return data.data;
};

// Get user contracts
export const getUserContracts = async (): Promise<SignedContract[]> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/my-contracts`, {
    method: "GET",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contracts");
  }

  // Handle guest mode response
  if (data.guestMode && !data.isAuthenticated) {
    // Return empty array for guest users, let the UI handle the guest flow
    return [];
  }

  // Handle authenticated user response
  if (Array.isArray(data.data)) {
    return data.data;
  }

  // Fallback - return empty array if data structure is unexpected
  return [];
};

// Check if user is in guest mode and get guest form structure
export const checkGuestMode = async (): Promise<{
  isGuestMode: boolean;
  isAuthenticated: boolean;
  guestFormData?: any;
}> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/my-contracts`, {
    method: "GET",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to check authentication status");
  }

  return {
    isGuestMode: data.guestMode || false,
    isAuthenticated: data.isAuthenticated || false,
    guestFormData: data.guestMode ? data.data : null,
  };
};

// Get contracts for guest users
export const getGuestContracts = async (guestInfo: {
  name: string;
  email: string;
  phone?: string;
}): Promise<{
  contracts: SignedContract[];
  guestId: string;
  message: string;
}> => {
  const response = await fetch(`${API_URL}/contracts/my-contracts/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestInfo),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch guest contracts");
  }

  return {
    contracts: data.data || [],
    guestId: data.guestId || "",
    message: data.message || "",
  };
};

// Get contract by ID
export const getContractById = async (
  contractId: string
): Promise<SignedContract> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/${contractId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract");
  }

  return data.data;
};

// PDF generation and download functions removed - backend no longer generates PDFs
// Frontend can optionally generate PDFs client-side using jsPDF if needed
