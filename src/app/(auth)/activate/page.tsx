"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  ArrowLeft,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import toast from "react-hot-toast";

// Loading component for Suspense fallback
function ActivatePageLoading() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
              <CardTitle className="text-white text-2xl">Loading</CardTitle>
              <CardDescription className="text-gray-400">
                Please wait...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Main component that uses useSearchParams
function ActivatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activationStatus, setActivationStatus] = useState("checking"); // checking, verified, error
  const [needsPassword, setNeedsPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  // Password setup form state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check activation token on component mount
  useEffect(() => {
    if (token) {
      checkActivationToken();
    } else {
      setError(
        "Invalid activation link. Please check your email for the correct link."
      );
      setActivationStatus("error");
    }
  }, [token]);

  const checkActivationToken = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`/api/auth/activate/${token}`);
      const data = await response.json();

      if (data.success) {
        setUserEmail(data.data.email);
        setUserName(data.data.name);

        if (data.data.needsPassword) {
          setNeedsPassword(true);
          setActivationStatus("verified");
        } else {
          setSuccess(data.message);
          setActivationStatus("completed");
        }
      } else {
        setError(data.message || "Failed to verify activation token");
        setActivationStatus("error");
      }
    } catch (error) {
      console.error("Activation check error:", error);
      setError("Failed to verify activation token. Please try again.");
      setActivationStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setActivationStatus("completed");
        toast.success(
          "Account activated successfully! Redirecting to login..."
        );

        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to set password");
        toast.error(data.message || "Failed to set password");
      }
    } catch (error) {
      console.error("Password setup error:", error);
      setError("Failed to set password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking activation
  if (activationStatus === "checking") {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
                <CardTitle className="text-white text-2xl">
                  Verifying Account
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Please wait while we verify your activation link...
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (activationStatus === "error") {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">
                  Activation Failed
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {error}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go to Login
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show completed state
  if (activationStatus === "completed") {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">
                  Account Activated!
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {success}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Go to Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show password setup form
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <KeyRound className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">
                Complete Account Setup
              </CardTitle>
              <CardDescription className="text-gray-400">
                Welcome {userName}! Please set your password to activate your
                account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="bg-slate-700 border-slate-600 text-slate-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400 hover:text-slate-300" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting Password...
                    </>
                  ) : (
                    "Activate Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function ActivatePage() {
  return (
    <Suspense fallback={<ActivatePageLoading />}>
      <ActivatePageContent />
    </Suspense>
  );
}
