import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface TransactionData {
    userId?: string;
    amount: number;
    currency?: string;
    type: 'charge' | 'refund' | 'payout' | 'adjustment' | 'subscription' | 'invoice';
    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'disputed';
    description?: string;
    metadata?: {
        contractId?: string;
        productType?: string;
        productName?: string;
        subscriptionType?: string;
        paymentMethod?: string;
        [key: string]: any;
    };
    psp?: {
        provider: 'stripe' | 'paypal' | 'manual' | 'other';
        reference?: {
            chargeId?: string;
            paymentIntentId?: string;
            transactionId?: string;
            orderId?: string;
            [key: string]: any;
        };
    };
    billingDetails?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: {
            line1?: string;
            line2?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            country?: string;
        };
    };
    subscriptionId?: string;
    invoiceId?: string;
}

export interface Transaction {
    _id: string;
    transactionId: string;
    userId: string;
    amount: number;
    currency: string;
    type: string;
    status: string;
    description?: string;
    metadata?: Record<string, any>;
    psp: {
        provider: string;
        reference?: Record<string, any>;
    };
    billingDetails?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: Record<string, any>;
    };
    timeline: {
        initiatedAt: string;
        completedAt?: string;
        cancelledAt?: string;
        refundedAt?: string;
    };
    createdAt: string;
    updatedAt: string;
}

/**
 * Create a new transaction (requires authentication)
 */
export const createTransaction = async (transactionData: TransactionData): Promise<{
    success: boolean;
    transaction: Transaction;
}> => {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create transaction");
    }

    return data;
};

/**
 * Get user's transactions (requires authentication)
 */
export const getUserTransactions = async (params: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
} = {}): Promise<{
    success: boolean;
    transactions: Transaction[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalTransactions: number;
        limit: number;
    };
}> => {
    const token = Cookies.get("token");

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value.toString());
        }
    });

    const response = await fetch(`${API_URL}/transactions?${searchParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch transactions");
    }

    return data;
};

/**
 * Get transaction by ID (requires authentication)
 */
export const getTransactionById = async (transactionId: string): Promise<{
    success: boolean;
    transaction: Transaction;
}> => {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch transaction");
    }

    return data;
};

/**
 * Get transaction statistics (requires authentication)
 */
export const getTransactionStats = async (params: {
    startDate?: string;
    endDate?: string;
    type?: string;
} = {}): Promise<{
    success: boolean;
    stats: {
        totalTransactions: number;
        totalAmount: number;
        averageAmount: number;
        byStatus: Record<string, number>;
        byType: Record<string, number>;
        recentTransactions: Transaction[];
    };
}> => {
    const token = Cookies.get("token");

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value.toString());
        }
    });

    const response = await fetch(`${API_URL}/transactions/stats?${searchParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch transaction statistics");
    }

    return data;
};
