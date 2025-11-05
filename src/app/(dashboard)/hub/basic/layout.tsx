"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Loader2 } from "lucide-react";
import Header from "@/components/hub/header";
import Footer from "@/components/hub/footer";
import BasicSidebar from "@/components/hub/basicSidebar";
import AccessDenied from "@/components/auth/access-denied";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { profile, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    // Strict access control: Only allow Basic or None subscription users
    if (!loading && isAuthenticated && profile) {
      if (profile.subscription !== "Basic" && profile.subscription !== "None") {
        console.log(
          `Redirecting user with "${profile.subscription}" subscription away from Basic dashboard`
        );
        // Immediate redirect to appropriate dashboard
        switch (profile.subscription) {
          case "Diamond":
            router.replace("/hub/diamond");
            break;
          case "Infinity":
            router.replace("/hub/infinity");
            break;
          case "Script":
            router.replace("/hub/script");
            break;
          default:
            router.replace("/hub/basic");
            break;
        }
      }
    }
  }, [loading, isAuthenticated, profile, router]);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
         
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return null;
  }

  // STRICT ACCESS CONTROL - Allow only Basic or None subscription users
  console.log(`🔍 DEBUG: Checking access for Basic dashboard`);
  console.log(`🔍 DEBUG: User subscription: "${profile.subscription}"`);
  console.log(`🔍 DEBUG: Profile object:`, profile);

  if (profile.subscription !== "Basic" && profile.subscription !== "None") {
    console.log(
      `🚫 ACCESS DENIED: User has "${profile.subscription}" subscription, cannot access Basic dashboard`
    );
    console.log(
      `🚫 Expected: "Basic" or "None", Got: "${profile.subscription}"`
    );
    return (
      <AccessDenied
        requiredSubscription="Basic"
        currentSubscription={profile.subscription}
        message="Access Denied: You have a premium subscription. Redirecting you to your appropriate dashboard..."
      />
    );
  }

  console.log(
    `✅ ACCESS GRANTED: User has "${profile.subscription}" subscription, can access Basic dashboard`
  );

  // Convert profile to user format expected by components
  const user = {
    name: `${profile.firstName} ${profile.lastName}`,
    email: profile.email,
    avatarUrl: "/placeholder-user.jpg",
    subscription: profile.subscription as
      | "Diamond"
      | "Infinity"
      | "None"
      | "Basic"
      | "Script",
  };

  return (
    <div className="min-h-screen bg-brand-bg-dark text-white">
      <BasicSidebar user={user} />
      <div className="lg:pl-64">
        <Header user={user} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
