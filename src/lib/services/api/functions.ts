import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface FunctionParams {
  functionName: string;
  params: Record<string, any>;
}

export interface FunctionResponse {
  result: any;
  executionTime?: number;
}

// Execute a function
export const executeFunction = async (
  functionParams: FunctionParams
): Promise<FunctionResponse> => {
  const token = Cookies.get("token");

  // First, try to execute locally using the Next.js API route
  try {
    const response = await fetch("/api/functions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(functionParams),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to execute function");
    }

    return data.data;
  } catch (error) {
    // If local execution fails, try direct API call as fallback
    console.warn("Local function execution failed, trying direct API call:", error);

    const response = await fetch(`${API_URL}/functions/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(functionParams),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to execute function");
    }

    return data.data;
  }
};

// Get available functions
export const getAvailableFunctions = async (): Promise<string[]> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/functions/available`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch available functions");
  }

  return data.data;
};
