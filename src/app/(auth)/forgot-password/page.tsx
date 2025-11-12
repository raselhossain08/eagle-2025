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
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    toast.loading("Sending reset link...", { duration: Infinity });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        data,
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.dismiss();
      setEmailSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch (error) {
      toast.dismiss();

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to send reset link";
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
                {emailSent ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Mail className="w-6 h-6 text-white" />
                )}
              </div>
              <CardTitle className="text-white text-2xl">
                {emailSent ? "Check Your Email" : "Forgot Password?"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {emailSent
                  ? "We've sent you a password reset link"
                  : "Enter your email to receive a reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!emailSent ? (
                <>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm">
                          {errors.email.message}
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
                          <span className="ml-2">Sending...</span>
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <Link
                      href="/login"
                      className="flex items-center justify-center text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Login
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                      <p className="text-gray-300 text-sm">
                        We've sent a password reset link to{" "}
                        <span className="text-green-400 font-semibold">
                          {getValues("email")}
                        </span>
                      </p>
                    </div>

                    <div className="text-gray-400 text-sm space-y-2">
                      <p>Please check your email and click the reset link.</p>
                      <p className="text-xs">
                        The link will expire in 10 minutes for security reasons.
                      </p>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button
                        onClick={() => setEmailSent(false)}
                        variant="outline"
                        className="w-full border-slate-600 text-white hover:bg-slate-700"
                      >
                        Try Different Email
                      </Button>

                      <Link href="/login" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-slate-600 text-white hover:bg-slate-700"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Login
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <p className="text-center text-sm text-gray-400">
                      Didn't receive the email?
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-1">
                      Check your spam folder or contact support
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Security Note */}
          <div className="mt-6 bg-blue-900/30 border border-blue-600 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">i</span>
              </div>
              <div>
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Security Notice
                </p>
                <p className="text-gray-300 text-xs">
                  For your security, we'll send the reset link only if an
                  account exists with this email. The link expires in 10
                  minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
