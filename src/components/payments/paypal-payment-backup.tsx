"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

interface PayPalPaymentProps {
  contractId: string;
  amount: string;
  productName: string;
  subscriptionType?: "monthly" | "yearly";
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PayPalPayment({
  contractId,
  amount,
  productName,
  subscriptionType = "monthly",
  onPaymentSuccess,
  onPaymentError,
}: PayPalPaymentProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  useEffect(() => {
    // Validate PayPal configuration first
    if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
      console.error("PayPal Client ID not found in environment variables");
      setIsLoading(false);
      onPaymentError("PayPal configuration missing");
      return;
    }

    console.log(
      "PayPal Client ID found:",
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID.substring(0, 10) + "..."
    );

    // Load PayPal SDK with preconnect optimization
    const loadPayPalScript = () => {
      if (window.paypal) {
        console.log("PayPal already loaded, initializing...");
        initializePayPal();
        return;
      }

      console.log("Loading PayPal SDK...");

      // Add preconnect for faster loading
      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = process.env.NEXT_PUBLIC_PAYPAL_SDK_URL?.replace('/sdk/js', '') || "https://www.paypal.com";
      document.head.appendChild(preconnect);

      const script = document.createElement("script");
      script.src = `${process.env.NEXT_PUBLIC_PAYPAL_SDK_URL || "https://www.paypal.com/sdk/js"}?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&intent=capture&disable-funding=credit,card`;
      script.async = true;
      script.defer = true; // Use defer for better performance

      let loadTimeout: NodeJS.Timeout;

      script.onload = () => {
        console.log("PayPal SDK loaded successfully");
        clearTimeout(loadTimeout);
        // Small delay to ensure PayPal object is fully initialized
        setTimeout(() => {
          if (window.paypal) {
            console.log("PayPal object available, initializing...");
            initializePayPal();
          } else {
            console.error("PayPal object not available after script load");
            setIsLoading(false);
            onPaymentError("PayPal failed to initialize");
          }
        }, 100);
      };

      script.onerror = (error) => {
        console.error("PayPal SDK script error:", error);
        clearTimeout(loadTimeout);
        setIsLoading(false);
        onPaymentError("Failed to load PayPal SDK");
      };

      // Set timeout for loading
      loadTimeout = setTimeout(() => {
        console.error("PayPal SDK loading timeout");
        setIsLoading(false);
        onPaymentError("PayPal SDK loading timeout");
      }, 10000); // Reduced to 10 seconds for faster feedback

      document.head.appendChild(script); // Append to head for better performance
    };

    const initializePayPal = () => {
      if (!window.paypal) {
        console.error("PayPal object not available");
        setIsLoading(false);
        onPaymentError("PayPal not available");
        return;
      }

      if (!paypalRef.current) {
        console.error("PayPal container ref not available");
        setIsLoading(false);
        onPaymentError("PayPal container not ready");
        return;
      }

      console.log("Initializing PayPal buttons...");

      // Clear any existing buttons for better performance
      if (paypalRef.current.innerHTML) {
        paypalRef.current.innerHTML = "";
      }

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 45,
            tagline: false, // Remove extra text for faster loading
          },

          createOrder: async () => {
            try {
              setPaymentStatus("processing");

              const token = Cookies.get("token");
              console.log("PayPal createOrder - Token exists:", !!token);
              console.log(
                "PayPal createOrder - API URL:",
                process.env.NEXT_PUBLIC_API_URL
              );
              console.log("PayPal createOrder - Contract ID:", contractId);
              console.log(
                "PayPal createOrder - Subscription Type:",
                subscriptionType
              );

              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/create-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    contractId,
                    subscriptionType,
                  }),
                }
              );

              const data = await response.json();
              console.log(
                "PayPal createOrder - Response status:",
                response.status
              );
              console.log("PayPal createOrder - Response data:", data);

              if (!response.ok) {
                throw new Error(data.message || "Failed to create order");
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
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/capture-order/${data.orderID}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    contractId,
                    subscriptionType,
                  }),
                }
              );

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.message || "Payment capture failed");
              }

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
            console.error("PayPal error:", error);
            setPaymentStatus("error");
            onPaymentError("PayPal payment error occurred");

            toast({
              title: "Payment Error",
              description: "An error occurred with PayPal payment",
              variant: "destructive",
            });
          },

          onCancel: () => {
            setPaymentStatus("idle");
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process",
              variant: "destructive",
            });
          },
        })
        .render(paypalRef.current)
        .then(() => {
          console.log("PayPal buttons rendered successfully");
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error("PayPal render error:", error);
          setIsLoading(false);
          onPaymentError(
            `Failed to initialize PayPal buttons: ${error.message || error}`
          );
        });
    };

    loadPayPalScript();
  }, [
    contractId,
    productName,
    subscriptionType,
    onPaymentSuccess,
    onPaymentError,
  ]);

  if (isLoading) {
    return (
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
              <span className="text-white">Loading PayPal...</span>
            </div>
            <div className="text-sm text-gray-400 text-center">
              <p>This may take a few seconds.</p>
              <p>If loading continues, please refresh the page.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsLoading(false);
                onPaymentError("Loading cancelled by user");
              }}
              className="mt-2 text-xs"
            >
              Cancel Loading
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                Product: <span className="text-white">{productName}</span>
              </p>
              <p className="text-gray-400">
                Amount: <span className="text-white">${amount} USD</span>
              </p>
            </div>
          </div>

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
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">
                  Payment failed. Please try again.
                </span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Secure payment powered by PayPal</span>
            </div>

            <div ref={paypalRef} className="min-h-[50px]" />

            <div className="text-xs text-gray-500 text-center">
              Your payment is secured by PayPal's buyer protection program
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
