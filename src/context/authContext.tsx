// app/context/authContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { getProfile } from "@/lib/services/api/user";
import { UserProfile } from "@/lib/types";

// Define the context shape
interface AuthContextType {
  token: string | null;
  user: { id?: string; role?: string; subscription?: string } | null;
  logout: () => Promise<void>;
  login: (token: string) => void;
  isAuthenticated: boolean;
  loading: boolean;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id?: string;
    role?: string;
    subscription?: string;
  } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch profile when token is available
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then(setProfile)
        .catch((error) => {
          console.error("Failed to fetch profile:", error);

          // If authentication failed, logout user
          if (
            error.message.includes("expired") ||
            error.message.includes("invalid") ||
            error.message.includes("Authentication failed")
          ) {
            toast.error("Session expired - please login again");
            // Clean up without calling logout to avoid circular dependency
            Cookies.remove("token");
            setToken(null);
            setUser(null);
            setProfile(null);
            router.push("/login");
          } else {
            toast.error("Failed to fetch profile - please try again");
          }
        });
    } else {
      setProfile(null);
    }
  }, [token, router]);

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = Cookies.get("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken) as {
          id?: string;
          role?: string;
          exp?: number;
        };

        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // Token expired - clean up
          Cookies.remove("token");
          setToken(null);
          setUser(null);
          setProfile(null);
        } else {
          setToken(savedToken);
          setUser({ id: decoded.id, role: decoded.role });
        }
      } catch (error) {
        console.error("Invalid token on load:", error);
        // Clean up invalid token
        Cookies.remove("token");
        setToken(null);
        setUser(null);
        setProfile(null);
      }
    }
    setLoading(false);
  }, []);

  const refreshProfile = async () => {
    if (token) {
      try {
        const profileData = await getProfile(token);
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to refresh profile:", error);
        toast.error("Failed to refresh profile");
      }
    }
  };

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode(newToken) as {
        id?: string;
        role?: string;
        exp?: number;
      };

      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        throw new Error("Token is expired");
      }

      // Store token in cookies
      Cookies.set("token", newToken, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setToken(newToken);
      setUser({ id: decoded.id, role: decoded.role });
    } catch (error) {
      console.error("Invalid token provided:", error);
      toast.error("Invalid authentication token");
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      Cookies.remove("token");
      setToken(null);
      setUser(null);
      setProfile(null);
      toast.success("Logged out successfully!", { duration: 3000 });
      setTimeout(() => router.push("/login"), 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        logout,
        login,
        isAuthenticated: !!token,
        loading,
        profile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
