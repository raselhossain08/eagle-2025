// app/lib/api/user.ts
import axios from "axios";
import Cookies from "js-cookie";
import { UserProfile } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to check if JWT token is valid and not expired
const isTokenValid = (token: string): boolean => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const isExpired = payload.exp && payload.exp < Date.now() / 1000;

    return !isExpired;
  } catch {
    return false;
  }
};

// Function with explicit token parameter
export const getProfile = async (token: string): Promise<UserProfile> => {
  if (!token || token.trim() === "") {
    throw new Error("Valid authentication token is required");
  }

  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  // Pre-validate token before making request
  if (!isTokenValid(token)) {
    throw new Error("Token has expired or is invalid - please login again");
  }

  try {
    console.log("Making request to:", `${API_BASE_URL}/user/profile`);
    console.log("Token preview:", token.substring(0, 20) + "...");

    const res = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if response data exists and is valid
    if (!res.data) {
      throw new Error("No profile data received from server");
    }

    // Validate that required fields exist
    if (!res.data.email || !res.data.firstName || !res.data.lastName) {
      throw new Error("Incomplete profile data received");
    }

    return res.data;
  } catch (error) {
    console.error("Get profile error:", error);

    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      console.log("API Error Details:", {
        status,
        url: error.config?.url,
        responseData,
      });

      if (status === 401) {
        // Check if token is expired by decoding it
        try {
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const isExpired =
            tokenPayload.exp && tokenPayload.exp < Date.now() / 1000;

          if (isExpired) {
            throw new Error("Token has expired - please login again");
          } else {
            throw new Error("Authentication failed - invalid token");
          }
        } catch (decodeError) {
          throw new Error("Authentication failed - malformed token");
        }
      }
      if (status === 404) {
        throw new Error("Profile not found");
      }
      if (status && status >= 500) {
        throw new Error("Server error - please try again later");
      }

      // Generic error with status code
      throw new Error(
        `API Error: ${status} - ${responseData?.message || error.message}`
      );
    }

    throw error;
  }
};

// Function that automatically gets token from cookies
export const getProfileFromToken = async (): Promise<UserProfile> => {
  const token = Cookies.get("token");

  if (!token || token.trim() === "") {
    throw new Error("No authentication token found - please login");
  }

  try {
    return await getProfile(token);
  } catch (error) {
    // If token is invalid, remove it from cookies
    if (
      error instanceof Error &&
      error.message.includes("Authentication failed")
    ) {
      Cookies.remove("token");
    }
    throw error;
  }
};

export const deleteProfile = async (token: string) => {
  if (!token || token.trim() === "") {
    throw new Error("Valid authentication token is required");
  }

  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  try {
    const res = await axios.delete(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Delete profile error:", error);

    // Handle specific axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        throw new Error("Authentication failed - please login again");
      }
      if (status === 403) {
        throw new Error("You don't have permission to delete this profile");
      }
      if (status === 404) {
        throw new Error("Profile not found");
      }
      if (status && status >= 500) {
        throw new Error("Server error - please try again later");
      }
    }

    throw error;
  }
};
