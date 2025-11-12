"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import { Lock, CheckCircle, Eye, EyeOff } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Reset token is missing");
      return;
    }

    setIsLoading(true);
    toast.loading("Resetting password...", { duration: Infinity });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password/${token}`,
        data,
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.dismiss();
      setResetSuccess(true);
      toast.success("Password reset successful!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast.dismiss();

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to reset password";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                {resetSuccess ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Lock className="w-6 h-6 text-white" />
                )}
              </div>
              <CardTitle className="text-white text-2xl">
                {resetSuccess ? "Password Reset!" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {resetSuccess
                  ? "Your password has been updated"
                  : "Enter your new password"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!resetSuccess ? (
                <>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...register("password")}
                          required
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          {...register("confirmPassword")}
                          required
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <ClipLoader color="#ffffff" size={20} />
                          <span className="ml-2">Resetting...</span>
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <p className="text-center text-sm text-gray-400">
                      Remember your password?{" "}
                      <Link
                        href="/login"
                        className="text-cyan-400 hover:underline"
                      >
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                      <p className="text-green-300 font-semibold mb-2">
                        Success!
                      </p>
                      <p className="text-gray-300 text-sm">
                        Your password has been reset successfully. You can now
                        log in with your new password.
                      </p>
                    </div>

                    <div className="text-gray-400 text-sm text-center">
                      <p>Redirecting to login page...</p>
                      <div className="flex justify-center mt-3">
                        <ClipLoader color="#06b6d4" size={24} />
                      </div>
                    </div>

                    <Link href="/login" className="block">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                        Go to Login
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Password Tips */}
          {!resetSuccess && (
            <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-4">
              <p className="text-white font-semibold text-sm mb-2">
                Password Tips:
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Use at least 6 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers and special characters</li>
                <li>• Avoid common words or patterns</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
