"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function HubPage() {
  const { profile, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!loading && isAuthenticated && profile) {
      // Redirect based on subscription level
      switch (profile.subscription) {
        case "Basic":
          router.push("/hub/basic");
          break;
        case "Diamond":
          router.push("/hub/diamond");
          break;
        case "Infinity":
          router.push("/hub/infinity");
          break;
        case "Script":
          router.push("/hub/script");
          break;
        case "None":
        default:
          router.push("/hub/basic");
          break;
      }
    }
  }, [loading, isAuthenticated, profile, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center">
        <Card className="bg-brand-bg-light border-brand-border p-8 text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
            <span className="text-white font-semibold">
              Loading your dashboard...
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            Please wait while we prepare your personalized experience.
          </p>
        </Card>
      </div>
    );
  }

  // This should not be reached due to the redirect logic above
  return null;
}
