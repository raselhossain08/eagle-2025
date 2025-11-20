"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PaymentInfoDisplay } from "@/components/payments/payment-info-display";
import Cookies from "js-cookie";
import publicPaymentService from "@/lib/services/public-payment.service";

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://eagleinvest.us/api";
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
  // Check PayPal minimum amount requirement ($1.00)
  const paymentAmount = parseFloat(amount);
  const isAmountTooLow = paymentAmount < 1.0 && paymentAmount > 0;
  // Free order logic removed - all transactions must go through payment gateway
  const isFreeOrder = false;

  const [paypalContainer, setPaypalContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [isMounted, setIsMounted] = useState(false);
  const [paypalConfig, setPaypalConfig] = useState<{
    clientId: string;
    mode: string;
  } | null>(null);

  // Ref callback to capture the container element when it mounts
  const paypalRef = (node: HTMLDivElement | null) => {
    if (node !== null) {
      console.log("✅ PayPal container attached to DOM");
      setPaypalContainer(node);
    }
  };

  // Check if PayPal SDK is already loaded
  const isPayPalLoaded = () => {
    return (
      typeof window !== "undefined" && window.paypal && window.paypal.Buttons
    );
  };

  // Load PayPal SDK
  const loadPayPalScript = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
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

      try {
        // Get dynamic PayPal configuration
        const settings = await publicPaymentService.getPublicSettings();
        const clientId = settings.paypal.clientId;
        const sdkBaseUrl = PAYPAL_SDK_URL;

        if (!clientId) {
          reject(new Error("PayPal not configured in backend"));
          return;
        }

        console.log("🔧 PayPal SDK Configuration (Dynamic):");
        console.log(
          "  - Client ID:",
          clientId ? `${clientId.substring(0, 10)}...` : "MISSING"
        );
        console.log("  - SDK Base URL:", sdkBaseUrl);
        console.log("  - Mode:", settings.paypal.mode);
        console.log("  - Enabled:", settings.paypal.enabled);

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
          console.error("⏱️ PayPal SDK loading timeout (10s exceeded)");
          reject(new Error("PayPal SDK loading timeout"));
        }, 10000);

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
      } catch (error: any) {
        console.error("❌ Error loading PayPal config:", error);
        reject(
          new Error(error.message || "Failed to load PayPal configuration")
        );
      }
    });
  };

  // Fetch PayPal configuration from API
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        console.log("🔄 Fetching PayPal configuration from API...");
        const settings = await publicPaymentService.getPublicSettings();

        if (!settings.paypal.enabled) {
          throw new Error("PayPal payment is currently disabled");
        }

        if (!settings.paypal.clientId) {
          throw new Error("PayPal client ID not configured");
        }

        setPaypalConfig({
          clientId: settings.paypal.clientId,
          mode: settings.paypal.mode,
        });

        console.log("✅ PayPal configuration loaded:", {
          mode: settings.paypal.mode,
          enabled: settings.paypal.enabled,
        });
      } catch (error: any) {
        console.error("❌ Failed to fetch PayPal config:", error);
        onPaymentError(error.message || "Failed to load PayPal configuration");
      }
    };

    fetchConfig();
  }, []);

  // Ensure component is mounted (client-side only) and preload SDK
  useEffect(() => {
    setIsMounted(true);

    // Start loading PayPal SDK immediately to reduce wait time (only if config is loaded)
    if (typeof window !== "undefined" && !isPayPalLoaded() && paypalConfig) {
      console.log("🚀 Preloading PayPal SDK...");
      loadPayPalScript().catch((err) => {
        console.error("Preload failed:", err);
      });
    }
  }, [paypalConfig]);

  // Initialize PayPal buttons
  const initializePayPal = async () => {
    if (isInitializing) {
      console.log("PayPal already initializing, skipping...");
      return null;
    }

    if (!isPayPalLoaded()) {
      console.error("PayPal SDK not loaded");
      throw new Error("PayPal SDK not available");
    }

    if (!paypalContainer) {
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
      // Clear any existing buttons safely
      if (paypalContainer.innerHTML) {
        paypalContainer.innerHTML = "";
      }

      // Check if PayPal buttons are already rendered
      if (paypalContainer.firstChild) {
        console.log("⚠️ PayPal buttons already exist, skipping initialization");
        setIsLoading(false);
        setIsInitializing(false);
        return null;
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
            console.log("🔍 PayPal Order Creation Debug:", {
              contractId,
              subscriptionType,
              amount,
              discountCode,
              discountAmount,
              hasToken: !!token,
            });

            // Calculate final amount with discount
            let finalAmount = parseFloat(amount);
            console.log("💰 PAYPAL AMOUNT DEBUG:");
            console.log("  Original amount prop:", amount);
            console.log("  Parsed amount:", finalAmount);
            console.log("  Discount code:", discountCode);
            console.log("  Discount amount:", discountAmount);

            // Apply discount if provided
            if (discountCode && discountAmount && discountAmount > 0) {
              const originalAmount = finalAmount;
              if (originalAmount >= discountAmount) {
                finalAmount = Math.max(0, originalAmount - discountAmount);
                console.log("🔧 DISCOUNT APPLIED IN PAYPAL:");
                console.log("  Original:", originalAmount);
                console.log("  Discount:", discountAmount);
                console.log("  Final:", finalAmount);
              }
            }

            // HANDLE FREE ORDERS (100% DISCOUNT)
            if (finalAmount === 0) {
              console.log(
                "🎉 FREE ORDER DETECTED - Completing without PayPal payment"
              );

              const freeOrderResponse = await fetch(
                `${API_URL}/paypal/contracts/complete-free-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                  },
                  body: JSON.stringify({
                    contractId,
                    subscriptionType,
                    discountCode,
                    discountAmount,
                    productName,
                  }),
                }
              );

              const freeOrderData = await freeOrderResponse.json();
              console.log("✅ Free order response:", freeOrderData);

              if (!freeOrderResponse.ok) {
                throw new Error(
                  freeOrderData.message || "Failed to complete free order"
                );
              }

              setPaymentStatus("success");
              onPaymentSuccess({
                type: "free_order",
                contractId,
                discountCode,
                amount: 0,
                transactionId: freeOrderData.transactionId,
              });

              // Return a fake order ID to prevent PayPal SDK errors
              return "FREE_ORDER_COMPLETED";
            }

            const response = await fetch(
              `${API_URL}/paypal/contracts/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
                },
                body: JSON.stringify({
                  contractId,
                  subscriptionType,
                  amount: finalAmount,
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

            // Calculate final amount with discount (same as in createOrder)
            let finalAmount = parseFloat(amount);
            if (discountCode && discountAmount && discountAmount > 0) {
              const originalAmount = finalAmount;
              if (originalAmount >= discountAmount) {
                finalAmount = Math.max(0, originalAmount - discountAmount);
              }
            }

            const response = await fetch(
              `${API_URL}/paypal/contracts/capture-order/${data.orderID}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
                },
                body: JSON.stringify({
                  contractId,
                  subscriptionType,
                  amount: finalAmount,
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

      if (!paypalContainer) {
        throw new Error("PayPal container not available for rendering");
      }

      await paypalButtons.render(paypalContainer);
      console.log("PayPal buttons rendered successfully");
      setIsLoading(false);
      return paypalButtons;
    } catch (error: any) {
      console.error("PayPal initialization error:", error);
      setIsLoading(false);
      onPaymentError(`Failed to initialize PayPal: ${error.message || error}`);
      return null;
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
    if (paypalContainer) {
      paypalContainer.innerHTML = "";
    }

    try {
      if (!isPayPalLoaded()) {
        await loadPayPalScript();
      }

      // Initialize immediately
      await initializePayPal();
    } catch (error: any) {
      console.error("Retry script loading failed:", error);
      setIsLoading(false);
      onPaymentError(error.message || "Failed to load PayPal SDK");
    }
  };

  // Main effect - triggers when container is available
  useEffect(() => {
    // Wait for client-side mounting and container to be attached
    if (!isMounted || !paypalContainer) {
      console.log("⏳ Waiting for setup:", {
        isMounted,
        hasContainer: !!paypalContainer,
      });
      return;
    }

    // Wait for PayPal configuration to be loaded
    if (!paypalConfig) {
      console.log("⏳ Waiting for PayPal configuration from API...");
      return;
    }

    // Validation
    const amountValue = parseFloat(amount);

    console.log("🚀 PayPal Component Initialization (Dynamic Config)");
    console.log("  - Contract ID:", contractId);
    console.log("  - Amount:", amount);
    console.log("  - Amount (parsed):", amountValue);
    console.log("  - Client ID configured: ✅ Yes");
    console.log("  - Mode:", paypalConfig.mode);
    console.log("  - Backend API URL:", API_URL);
    console.log("  - isMounted:", isMounted);
    console.log("  - Container available: ✅ Yes");

    if (!contractId) {
      console.error("❌ Contract ID not provided");
      setIsLoading(false);
      onPaymentError("Contract ID is required");
      return;
    }

    if (isNaN(amountValue) || amountValue < 0) {
      console.error("❌ Invalid amount:", amount);
      setIsLoading(false);
      onPaymentError("Invalid payment amount");
      return;
    }

    console.log("✅ All validations passed, initializing PayPal...");

    let buttonsInstance: any = null;
    let isCleanedUp = false;

    const initPayPal = async () => {
      // Add timeout for initialization
      const initTimeout = setTimeout(() => {
        if (!isCleanedUp) {
          console.error("❌ PayPal initialization timeout (20s exceeded)");
          setIsLoading(false);
          onPaymentError(
            "PayPal initialization timed out. Please retry or contact support."
          );
        }
      }, 20000);

      try {
        // Load PayPal SDK if not already loaded
        if (!isPayPalLoaded()) {
          console.log("📥 Loading PayPal SDK...");
          await loadPayPalScript();
        }

        if (!isCleanedUp) {
          console.log("✅ PayPal container ready, initializing buttons...");
          buttonsInstance = await initializePayPal();
          clearTimeout(initTimeout);
        }
      } catch (error: any) {
        clearTimeout(initTimeout);
        if (!isCleanedUp) {
          console.error("❌ PayPal setup failed:", error);
          setIsLoading(false);
          onPaymentError(error.message || "PayPal setup failed");
        }
      }
    };

    initPayPal();

    // Cleanup function to prevent memory leaks and zoid errors
    return () => {
      console.log("🧹 PayPal component unmounting, cleaning up...");
      isCleanedUp = true;
      setIsLoading(false);
      setPaymentStatus("idle");
      setIsInitializing(false);

      // Cleanup PayPal buttons instance if it exists
      if (buttonsInstance && typeof buttonsInstance.close === "function") {
        try {
          buttonsInstance.close();
        } catch (e) {
          console.log("PayPal buttons already closed");
        }
      }

      // Clear container safely
      if (paypalContainer && paypalContainer.innerHTML) {
        paypalContainer.innerHTML = "";
      }
    };
  }, [contractId, amount, isMounted, paypalContainer, paypalConfig]); // Re-run when config changes

  // Render container div early (hidden) so ref attaches immediately
  const paypalContainerDiv = (
    <div
      ref={paypalRef}
      className="min-h-[50px] w-full"
      style={{ minHeight: "50px", display: isLoading ? "none" : "block" }}
    />
  );

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
          </div>
          {/* Hidden container for ref attachment */}
          {paypalContainerDiv}
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

  // Handle free orders (100% discount)
  if (isFreeOrder) {
    const handleFreeOrder = async () => {
      setIsLoading(true);
      setPaymentStatus("processing");

      try {
        const token = Cookies.get("token");
        const freeTransactionId = `free_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}`;

        console.log(
          "🎁 Processing 100% discounted order via PayPal - bypassing PayPal payment"
        );

        const confirmResponse = await fetch(
          `${API_URL}/paypal/contracts/confirm-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
              paymentIntentId: freeTransactionId,
              contractId,
              discountCode,
              discountAmount,
              finalAmount: 0,
              paymentMethod: "paypal",
              isFreeOrder: true,
            }),
          }
        );

        const confirmData = await confirmResponse.json();
        console.log("✅ Free order confirmation response:", confirmData);

        if (!confirmResponse.ok) {
          throw new Error(
            confirmData.message || "Failed to process free order"
          );
        }

        const paymentData = {
          paymentProvider: "paypal",
          paymentId: freeTransactionId,
          orderId: freeTransactionId,
          contractId,
          amount: "0.00",
          transactionId: freeTransactionId,
          contract: confirmData.contract,
          isFreeOrder: true,
          discountCode,
          discountAmount,
        };

        setPaymentStatus("success");
        console.log("🎉 Free order completed successfully!", paymentData);

        toast({
          title: "Order Completed",
          description: "Your free order has been processed successfully!",
        });

        onPaymentSuccess(paymentData);
      } catch (error: any) {
        console.error("❌ Free order processing error:", error);
        setPaymentStatus("error");
        onPaymentError(error.message || "Failed to process free order");

        toast({
          title: "Order Processing Failed",
          description: error.message || "Failed to process your free order",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        {/* Payment Information Display */}
        <PaymentInfoDisplay
          productName={productName}
          amount={0}
          subscriptionType={subscriptionType}
          discountCode={discountCode}
          discountAmount={discountAmount}
          originalAmount={discountAmount ? discountAmount : undefined}
          businessInfo={{
            name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Eagle Investors",
            supportEmail:
              process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
              "info@eagle-investors.com",
            website: "https://eagle-investors.com",
            phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-EAGLE-01",
          }}
        />

        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-400">
                    Free Order - 100% Discount Applied!
                  </h3>
                  <p className="text-gray-300">
                    Your order is completely free thanks to the discount code
                    you applied.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Click the button below to complete your free order and get
                    instant access.
                  </p>
                </div>
              </div>

              {paymentStatus === "processing" && (
                <div className="flex items-center justify-center space-x-2 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                  <span className="text-blue-400">
                    Processing your free order...
                  </span>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">
                      Order completed successfully!
                    </span>
                  </div>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">
                      Failed to process order. Please try again.
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleFreeOrder}
                disabled={isLoading || paymentStatus === "success"}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : paymentStatus === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Order Completed
                  </>
                ) : (
                  "Complete Free Order"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error if amount is below PayPal minimum
  if (isAmountTooLow) {
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
              process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
              "info@eagle-investors.com",
            website: "https://eagle-investors.com",
            phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-EAGLE-01",
          }}
        />

        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-400">
                  PayPal Not Available
                </h3>
                <p className="text-gray-300">
                  PayPal requires a minimum payment amount of{" "}
                  <strong>$1.00</strong>. Your current total is{" "}
                  <strong>${paymentAmount.toFixed(2)}</strong>.
                </p>
                <p className="text-gray-400 text-sm">
                  Please use a credit card payment method instead, or adjust
                  your order to meet the minimum requirement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

            {/* PayPal buttons container */}
            {paypalContainerDiv}

            <div className="text-xs text-gray-500 text-center">
              Your payment is secured by PayPal's buyer protection program
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
