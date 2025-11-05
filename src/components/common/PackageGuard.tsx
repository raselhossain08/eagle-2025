"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PackageGuardProps {
  children: React.ReactNode;
  requiredPackage: string | string[];
  fallbackPath?: string;
  showUpgrade?: boolean;
}

export default function PackageGuard({
  children,
  requiredPackage,
  fallbackPath = "/hub",
  showUpgrade = true,
}: PackageGuardProps) {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  const packageHierarchy = {
    None: 0,
    Basic: 1,
    Diamond: 2,
    Infinity: 3,
    Script: 2,
  };

  const checkAccess = () => {
    if (!profile || loading) return false;

    const userPackage = profile.subscription || "None";
    const userLevel =
      packageHierarchy[userPackage as keyof typeof packageHierarchy] || 0;

    // Convert required package to array
    const required = Array.isArray(requiredPackage)
      ? requiredPackage
      : [requiredPackage];

    // Check if user has any of the required packages
    const hasRequiredAccess = required.some((pkg) => {
      const requiredLevel =
        packageHierarchy[pkg as keyof typeof packageHierarchy] || 0;

      // Special case: Infinity has access to all Diamond features
      if (userPackage === "Infinity" && pkg === "Diamond") return true;

      return userLevel >= requiredLevel;
    });

    return hasRequiredAccess;
  };

  useEffect(() => {
    if (!loading) {
      const access = checkAccess();
      setHasAccess(access);
      setChecking(false);

      // Redirect if no access
      if (!access && !showUpgrade) {
        router.push(fallbackPath);
      }
    }
  }, [profile, loading, requiredPackage]);

  // Show loading while checking
  if (loading || checking) {
    return (
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Checking access...</p>
        </div>
      </div>
    );
  }

  // Show upgrade prompt if no access and showUpgrade is true
  if (!hasAccess && showUpgrade) {
    const userPackage = profile?.subscription || "None";
    const requiredArray = Array.isArray(requiredPackage)
      ? requiredPackage
      : [requiredPackage];

    return (
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-brand-bg-light rounded-lg border border-brand-border p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-8V7m0 0V5m0 2h2m-2 0H8"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Upgrade Required
            </h2>
            <p className="text-gray-300 mb-4">
              This feature requires{" "}
              <span className="text-yellow-400 font-semibold">
                {requiredArray.join(" or ")}
              </span>{" "}
              access.
            </p>
            <p className="text-gray-400 text-sm">
              Your current plan:{" "}
              <span className="text-cyan-400">{userPackage}</span>
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/pricing")}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Upgrade Now
            </button>
            <button
              onClick={() => router.push(fallbackPath)}
              className="w-full bg-transparent border border-brand-border text-white py-2 px-6 rounded-lg hover:bg-brand-bg-dark transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render children if access is granted
  if (hasAccess) {
    return <>{children}</>;
  }

  // Redirect case (shouldn't reach here if showUpgrade is true)
  return null;
}
