"use client";

import { ReactNode, useEffect, useState } from "react";
import { getCookie } from "cookies-next"; // Use cookies-next for cookie access
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      router.push(redirectPath);
    } else {
      setIsAuthenticated(true);
    }
  }, [router, redirectPath]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
