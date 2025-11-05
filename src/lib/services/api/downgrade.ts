// app/lib/api/downgrade.ts
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ScheduleDowngradeResponse {
  success: boolean;
  message: string;
  scheduledDowngrade: {
    targetSubscription: string;
    effectiveDate: string;
    currentSubscription: string;
  };
}

export interface CancelDowngradeResponse {
  success: boolean;
  message: string;
}

// Schedule subscription downgrade
export const scheduleDowngrade = async (
  targetSubscription: "Basic" | "Diamond",
  currentContractId: string
): Promise<ScheduleDowngradeResponse> => {
  const token = Cookies.get("token");

  if (!token || token.trim() === "") {
    throw new Error("No authentication token found - please login");
  }

  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  try {
    const res = await axios.post(
      `${API_BASE_URL}/subscription/schedule-downgrade`,
      {
        targetSubscription,
        currentContractId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Schedule downgrade error:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      if (status === 400) {
        throw new Error(responseData?.message || "Invalid downgrade request");
      }
      if (status === 401) {
        throw new Error("Authentication failed - please login again");
      }
      if (status === 404) {
        throw new Error("Contract not found");
      }
      if (status && status >= 500) {
        throw new Error("Server error - please try again later");
      }

      throw new Error(
        `API Error: ${status} - ${responseData?.message || error.message}`
      );
    }

    throw error;
  }
};

// Cancel scheduled downgrade
export const cancelDowngrade = async (
  contractId: string
): Promise<CancelDowngradeResponse> => {
  const token = Cookies.get("token");

  if (!token || token.trim() === "") {
    throw new Error("No authentication token found - please login");
  }

  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  try {
    const res = await axios.post(
      `${API_BASE_URL}/subscription/cancel-downgrade`,
      { contractId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Cancel downgrade error:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      if (status === 400) {
        throw new Error(responseData?.message || "Cannot cancel downgrade");
      }
      if (status === 401) {
        throw new Error("Authentication failed - please login again");
      }
      if (status === 404) {
        throw new Error("Contract or scheduled downgrade not found");
      }
      if (status && status >= 500) {
        throw new Error("Server error - please try again later");
      }

      throw new Error(
        `API Error: ${status} - ${responseData?.message || error.message}`
      );
    }

    throw error;
  }
};
