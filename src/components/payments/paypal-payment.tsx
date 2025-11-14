"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PaymentInfoDisplay } from "@/components/payments/payment-info-display";
import Cookies from "js-cookie";

// PayPal Configuration - Direct API credentials
const PAYPAL_MODE = "sandbox";
const PAYPAL_CLIENT_ID =
  "AcfFvFMNLJESxr3GaU3KuFNKjky-DV9rlOdP5NwUMIlmDsG0k46GWqeCEYEbfNH0xVrSv4ZPcMfxZiYI";
const PAYPAL_CLIENT_SECRET =
  "EFCrBFnuAYZySyoTABVUoFLHXaJp407__f7fiLcgSXJvoUf4fNGJgXUU38sYQXTShXMYplxn8ls5lE7o";
const PAYPAL_API = "https://api.sandbox.paypal.com";
const PAYPAL_SDK_URL = "https://www.paypal.com/sdk/js";

// Extend the global Window interface
declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalPaymentProps {
  contractId: string;
  amount: string;
  productName: string;
  subscriptionType?: "monthly" | "yearly";
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
  discountCode?: string;
  discountAmount?: number;
}

export function PayPalPayment({
  contractId,
  amount,
  productName,
  subscriptionType = "monthly",
  onPaymentSuccess,
  onPaymentError,
  discountCode,
  discountAmount,
}: PayPalPaymentProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const initializationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if PayPal SDK is already loaded
  const isPayPalLoaded = () => {
    return (
      typeof window !== "undefined" && window.paypal && window.paypal.Buttons
    );
  };

  // Load PayPal SDK
  const loadPayPalScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // If already loaded, resolve immediately
      if (isPayPalLoaded()) {
        console.log("PayPal SDK already loaded");
        setScriptLoaded(true);
        resolve();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector(
        'script[src*="paypal.com/sdk/js"]'
      );
      if (existingScript) {
        console.log("PayPal script already exists, waiting for load...");
        existingScript.addEventListener("load", () => {
          setScriptLoaded(true);
          resolve();
        });
        existingScript.addEventListener("error", (error) => {
          console.error("Existing PayPal script failed:", error);
          reject(new Error("PayPal script failed to load"));
        });
        return;
      }

      // Validate environment variables - use constants with fallback
      const clientId = PAYPAL_CLIENT_ID;
      const sdkBaseUrl = PAYPAL_SDK_URL;

      console.log("🔧 PayPal SDK Configuration:");
      console.log(
        "  - Client ID:",
        clientId ? `${clientId.substring(0, 10)}...` : "MISSING"
      );
      console.log("  - SDK Base URL:", sdkBaseUrl);
      console.log("  - Mode:", PAYPAL_MODE);
      console.log("  - API URL:", PAYPAL_API);

      console.log("✅ Loading PayPal SDK...");

      // Add preconnect for faster loading
      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = sdkBaseUrl.replace("/sdk/js", "");
      document.head.appendChild(preconnect);

      const script = document.createElement("script");
      const sdkUrl = `${sdkBaseUrl}?client-id=${clientId}&currency=USD&intent=capture&disable-funding=credit,card`;

      console.log(
        "📡 Loading from:",
        sdkUrl.replace(clientId, `${clientId.substring(0, 10)}...`)
      );

      script.src = sdkUrl;
      script.async = true;
      script.setAttribute("data-sdk-integration-source", "button-factory");

      const loadTimeout = setTimeout(() => {
        console.error("⏱️ PayPal SDK loading timeout (15s exceeded)");
        reject(new Error("PayPal SDK loading timeout"));
      }, 15000);

      script.onload = () => {
        console.log("✅ PayPal SDK loaded successfully");
        clearTimeout(loadTimeout);
        setScriptLoaded(true);
        resolve();
      };

      script.onerror = (error) => {
        console.error("❌ PayPal SDK script error:", error);
        console.error("🔍 Possible causes:");
        console.error("  1. Invalid PayPal Client ID");
        console.error("  2. Network connectivity issues");
        console.error("  3. PayPal service is down");
        console.error("  4. CORS or browser security blocking the script");
        console.error(
          "🔗 Script URL:",
          sdkUrl.replace(clientId, `${clientId.substring(0, 10)}...`)
        );
        clearTimeout(loadTimeout);
        reject(new Error("Failed to load PayPal SDK"));
      };

      document.head.appendChild(script);
      console.log("📝 PayPal script element added to document head");
    });
  };

  // Initialize PayPal buttons
  const initializePayPal = async () => {
    if (isInitializing) {
      console.log("PayPal already initializing, skipping...");
      return;
    }

    if (!isPayPalLoaded()) {
      console.error("PayPal SDK not loaded");
      throw new Error("PayPal SDK not available");
    }

    if (!paypalRef.current) {
      console.error("PayPal container not ready");
      throw new Error("PayPal container not ready");
    }

    if (!contractId) {
      console.error("Contract ID missing");
      throw new Error("Contract ID is required");
    }

    setIsInitializing(true);
    console.log("Initializing PayPal buttons for contract:", contractId);

    try {
      // Clear any existing buttons
      if (paypalRef.current.innerHTML) {
        paypalRef.current.innerHTML = "";
      }

      const paypalButtons = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: 45,
          tagline: false,
        },

        createOrder: async () => {
          try {
            setPaymentStatus("processing");

            const token = Cookies.get("token");
            // For guest users, token might not exist
            console.log("🔑 Token status:", token ? "Available" : "Guest mode");

            console.log("Creating PayPal order...");

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
                },
                body: JSON.stringify({
                  contractId,
                  subscriptionType,
                  amount,
                  ...(discountCode && { discountCode }),
                  ...(discountAmount && { discountAmount }),
                }),
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log("PayPal order created:", data.orderId);

            if (!data.orderId) {
              throw new Error("Order ID not received from server");
            }

            return data.orderId;
          } catch (error: any) {
            console.error("Error creating PayPal order:", error);
            setPaymentStatus("error");
            onPaymentError(error.message || "Failed to create payment order");
            throw error;
          }
        },

        onApprove: async (data: any) => {
          try {
            setPaymentStatus("processing");

            const token = Cookies.get("token");
            console.log(
              "🔑 Capture token status:",
              token ? "Available" : "Guest mode"
            );

            console.log("Capturing PayPal payment:", data.orderID);

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/capture-order/${data.orderID}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
                },
                body: JSON.stringify({
                  contractId,
                  subscriptionType,
                  amount,
                  ...(discountCode && { discountCode }),
                  ...(discountAmount && { discountAmount }),
                }),
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            const result = await response.json();
            console.log("Payment captured successfully:", result);

            setPaymentStatus("success");
            onPaymentSuccess({
              paymentId: data.orderID,
              contractId,
              status: "completed",
              ...result.data,
            });

            toast({
              title: "Payment Successful!",
              description: `Your ${productName} purchase has been completed.`,
            });
          } catch (error: any) {
            console.error("Error capturing PayPal payment:", error);
            setPaymentStatus("error");
            onPaymentError(error.message || "Payment processing failed");

            toast({
              title: "Payment Failed",
              description: error.message || "Payment processing failed",
              variant: "destructive",
            });
          }
        },

        onError: (error: any) => {
          console.error("PayPal payment error:", error);
          setPaymentStatus("error");
          const errorMessage =
            typeof error === "string" ? error : "PayPal payment error occurred";
          onPaymentError(errorMessage);

          toast({
            title: "Payment Error",
            description: "An error occurred with PayPal payment",
            variant: "destructive",
          });
        },

        onCancel: () => {
          console.log("PayPal payment cancelled");
          setPaymentStatus("idle");
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process",
            variant: "destructive",
          });
        },
      });

      await paypalButtons.render(paypalRef.current);
      console.log("PayPal buttons rendered successfully");
      setIsLoading(false);
    } catch (error: any) {
      console.error("PayPal initialization error:", error);
      setIsLoading(false);
      onPaymentError(`Failed to initialize PayPal: ${error.message || error}`);
    } finally {
      setIsInitializing(false);
    }
  };

  // Retry mechanism
  const handleRetry = async () => {
    console.log("Retrying PayPal initialization...");
    setIsLoading(true);
    setPaymentStatus("idle");

    // Clear existing buttons
    if (paypalRef.current) {
      paypalRef.current.innerHTML = "";
    }

    try {
      if (!isPayPalLoaded()) {
        await loadPayPalScript();
      }

      // Wait a bit for DOM to be ready
      setTimeout(() => {
        initializePayPal().catch((error) => {
          console.error("Retry failed:", error);
          setIsLoading(false);
          onPaymentError(error.message || "Retry failed");
        });
      }, 500);
    } catch (error: any) {
      console.error("Retry script loading failed:", error);
      setIsLoading(false);
      onPaymentError(error.message || "Failed to load PayPal SDK");
    }
  };

  // Main effect
  useEffect(() => {
    // Validation - use constant with fallback
    const clientId = PAYPAL_CLIENT_ID;

    console.log("🚀 PayPal Component Initialization");
    console.log("  - Contract ID:", contractId);
    console.log("  - Amount:", amount);
    console.log("  - Client ID configured: ✅ Yes");
    console.log("  - Mode:", PAYPAL_MODE);
    console.log("  - API URL:", PAYPAL_API);

    if (!contractId) {
      console.error("❌ Contract ID not provided");
      setIsLoading(false);
      onPaymentError("Contract ID is required");
      return;
    }

    console.log("✅ All validations passed, initializing PayPal...");

    const initPayPal = async () => {
      try {
        // Load PayPal SDK if not already loaded
        if (!isPayPalLoaded()) {
          await loadPayPalScript();
        }

        // Wait for DOM to be ready
        if (initializationTimeoutRef.current) {
          clearTimeout(initializationTimeoutRef.current);
        }

        initializationTimeoutRef.current = setTimeout(() => {
          if (paypalRef.current) {
            initializePayPal().catch((error) => {
              console.error("❌ PayPal initialization failed:", error);
              setIsLoading(false);
              onPaymentError(error.message || "PayPal initialization failed");
            });
          } else {
            console.error("❌ PayPal container ref not available");
            setIsLoading(false);
            onPaymentError("PayPal container not ready");
          }
        }, 100);
      } catch (error: any) {
        console.error("❌ PayPal setup failed:", error);
        setIsLoading(false);
        onPaymentError(error.message || "PayPal setup failed");
      }
    };

    initPayPal();

    // Cleanup
    return () => {
      console.log("🧹 PayPal component unmounting");
      if (initializationTimeoutRef.current) {
        clearTimeout(initializationTimeoutRef.current);
      }
      setIsLoading(false);
      setPaymentStatus("idle");
      setIsInitializing(false);
    };
  }, [contractId]); // Only re-run when contractId changes

  if (isLoading) {
    return (
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
              <span className="text-white">
                {scriptLoaded ? "Initializing PayPal..." : "Loading PayPal..."}
              </span>
            </div>
            <div className="text-sm text-gray-400 text-center">
              <p>This may take a few seconds.</p>
              <p>If loading continues, try the retry button.</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="text-xs"
              >
                Retry
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsLoading(false);
                  onPaymentError("Loading cancelled by user");
                }}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  console.log("🔵 PayPal Component Props to PaymentInfoDisplay:", {
    productName,
    amount: parseFloat(amount) || 0,
    discountCode,
    discountAmount,
    originalAmount: discountAmount
      ? parseFloat(amount) + discountAmount
      : undefined,
  });

  return (
    <div className="space-y-6">
      {/* Payment Information Display */}
      <PaymentInfoDisplay
        productName={productName}
        amount={parseFloat(amount) || 0}
        subscriptionType={subscriptionType}
        discountCode={discountCode}
        discountAmount={discountAmount}
        originalAmount={
          discountAmount ? parseFloat(amount) + discountAmount : undefined
        }
        businessInfo={{
          name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Eagle Investors",
          supportEmail:
            process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@eagle-investors.com",
          website: "https://eagle-investors.com",
          phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-EAGLE-01",
        }}
      />

      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-6">
          {paymentStatus === "processing" && (
            <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                <span className="text-blue-400">Processing payment...</span>
              </div>
            </div>
          )}

          {paymentStatus === "success" && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">
                  Payment completed successfully!
                </span>
              </div>
            </div>
          )}

          {paymentStatus === "error" && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">
                    Payment failed. Please try again.
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="text-xs"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Secure payment powered by PayPal</span>
            </div>

            <div
              ref={paypalRef}
              className="min-h-[50px] w-full"
              style={{ minHeight: "50px" }}
            />

            <div className="text-xs text-gray-500 text-center">
              Your payment is secured by PayPal's buyer protection program
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
