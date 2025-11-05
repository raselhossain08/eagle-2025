"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Loader2 } from "lucide-react";
import Header from "@/components/hub/header";
import Footer from "@/components/hub/footer";
import InfinitySidebar from "@/components/hub/infinitySidebar";
import AccessDenied from "@/components/auth/access-denied";

export default function InfinityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    // Strict access control: Only allow Infinity subscription users
    if (!loading && isAuthenticated && profile) {
      if (profile.subscription !== "Infinity") {
        console.log(
          `Redirecting user with "${profile.subscription}" subscription away from Infinity dashboard`
        );
        // Immediate redirect to appropriate dashboard
        switch (profile.subscription) {
          case "Basic":
          case "None":
            router.replace("/hub/basic");
            break;
          case "Diamond":
            router.replace("/hub/diamond");
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

  // STRICT ACCESS CONTROL - Block unauthorized users immediately
  if (profile.subscription !== "Infinity") {
    console.log(
      `🚫 ACCESS DENIED: User has "${profile.subscription}" subscription, cannot access Infinity dashboard`
    );
    return (
      <AccessDenied
        requiredSubscription="Infinity"
        currentSubscription={profile.subscription}
        message="Access Denied: You need an Infinity subscription to view this dashboard. Redirecting you to your dashboard..."
      />
    );
  }

  console.log(
    `✅ ACCESS GRANTED: User has "${profile.subscription}" subscription, can access Infinity dashboard`
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
      <InfinitySidebar user={user} />
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
