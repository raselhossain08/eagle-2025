"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CreditCard, CheckCircle, Shield, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import publicPaymentService from "@/lib/services/public-payment.service";

// Initialize Stripe dynamically
let stripePromise: Promise<any> | null = null;

const getStripePromise = async () => {
  if (!stripePromise) {
    const publishableKey = await publicPaymentService.getStripePublishableKey();
    if (!publishableKey) {
      throw new Error("Stripe not configured in backend");
    }
    console.log("✅ Loading Stripe with dynamic publishable key");
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

interface StripePaymentProps {
  contractId: string;
  amount: string;
  productName: string;
  subscriptionType?: "monthly" | "yearly";
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
  discountCode?: string;
  discountAmount?: number;
}

// Payment form component that uses Stripe hooks
function PaymentForm({
  contractId,
  amount,
  productName,
  subscriptionType = "monthly",
  onPaymentSuccess,
  onPaymentError,
  discountCode,
  discountAmount,
}: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Payment system not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPaymentStatus("processing");

    try {
      const token = Cookies.get("token");
      console.log(
        "🔑 Stripe token status:",
        token ? "Available" : "Guest mode"
      );

      let finalAmount = parseFloat(amount);

      console.log("🔍 STRIPE PAYMENT DEBUG - BEFORE DISCOUNT CHECK:");
      console.log("  📦 Contract ID:", contractId);
      console.log("  💰 Amount prop received:", amount, typeof amount);
      console.log("  💰 Parsed amount:", finalAmount);
      console.log("  🎟️ Discount code:", discountCode || "None");
      console.log("  💵 Discount amount:", discountAmount || 0);

      // CRITICAL FIX: If discountAmount and discountCode are provided,
      // recalculate finalAmount to ensure backend receives correct value
      // This handles the case where the amount prop hasn't been updated with discount
      if (discountCode && discountAmount && discountAmount > 0) {
        const originalAmount = finalAmount;
        // If amount appears to be pre-discount (i.e., >= discountAmount), apply discount
        if (originalAmount >= discountAmount) {
          finalAmount = Math.max(0, originalAmount - discountAmount);
          console.log("🔧 DISCOUNT APPLIED IN STRIPE COMPONENT:");
          console.log("  Original amount:", originalAmount);
          console.log("  Discount:", discountAmount);
          console.log("  Final amount:", finalAmount);
          console.log("  Is 100% off:", finalAmount === 0);
        } else {
          console.log(
            "✅ Amount already includes discount or is less than discount amount"
          );
        }
      }

      console.log("🔍 STRIPE PAYMENT DEBUG - FINAL:");
      console.log("  💰 Final amount to charge:", finalAmount);
      console.log("  📋 Product name:", productName);
      console.log("  🔄 Subscription type:", subscriptionType);

      // HANDLE FREE ORDERS (100% DISCOUNT)
      if (finalAmount === 0) {
        console.log(
          "🎉 FREE ORDER DETECTED - Completing without Stripe payment"
        );

        // Complete free order by directly updating contract
        const freeOrderResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/complete-free-order`,
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
        return;
      }

      // For paid orders, create Stripe payment intent with discount info
      console.log("🔄 Creating Stripe payment intent...");
      console.log("Contract ID:", contractId);
      console.log("Subscription Type:", subscriptionType);

      const intentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
          },
          body: JSON.stringify({
            contractId,
            subscriptionType,
            discountCode,
            discountAmount,
            amount: finalAmount, // Backend expects 'amount', not 'finalAmount'
          }),
        }
      );

      const intentData = await intentResponse.json();
      console.log("✅ Payment intent created:", {
        success: intentData.success,
        paymentIntentId: intentData.paymentIntentId,
        hasClientSecret: !!intentData.clientSecret,
      });

      if (!intentResponse.ok) {
        throw new Error(
          intentData.message || "Failed to create payment intent"
        );
      }

      const { clientSecret, paymentIntentId } = intentData;

      if (!clientSecret) {
        throw new Error("No client secret received from server");
      }

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      console.log("🔄 Confirming payment with Stripe...");

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              // You can add billing details here if needed
            },
          },
        }
      );

      if (error) {
        console.error("❌ Stripe confirmation error:", error);
        throw new Error(error.message || "Payment failed");
      }

      if (paymentIntent.status !== "succeeded") {
        console.error("❌ Payment intent status:", paymentIntent.status);
        throw new Error("Payment was not successful");
      }

      console.log("✅ Payment confirmed successfully");
      console.log("Payment Intent ID:", paymentIntent.id);

      // Confirm with backend
      console.log("🔄 Confirming payment with backend...");
      console.log("💰 SENDING TO BACKEND:", {
        paymentIntentId,
        contractId,
        discountCode,
        discountAmount,
        amount: Math.round(finalAmount * 100), // Send in cents
        amountInDollars: finalAmount,
        note: "Frontend sends amount in cents to backend",
      });

      const confirmResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/confirm-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
          },
          body: JSON.stringify({
            paymentIntentId,
            contractId,
            discountCode,
            discountAmount,
            amount: Math.round(finalAmount * 100), // Send in cents (Stripe standard)
          }),
        }
      );

      const confirmData = await confirmResponse.json();
      console.log("✅ Backend confirmation response:", confirmData);

      if (!confirmResponse.ok) {
        throw new Error(confirmData.message || "Payment confirmation failed");
      }

      const paymentData = {
        paymentMethod: "stripe",
        contractId,
        amount,
        transactionId: paymentIntent.id, // Use the actual payment intent ID from Stripe
        contract: confirmData.contract,
        discountCode,
        discountAmount,
      };

      setPaymentStatus("success");
      console.log("🎉 Payment completed successfully!");

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully!",
      });

      onPaymentSuccess(paymentData);
    } catch (error: any) {
      console.error("💥 Stripe payment error:", error);
      setPaymentStatus("error");
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
      onPaymentError(error.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Note: All orders including $0 orders require payment processing
  // Free order logic removed - all transactions must go through payment gateway

  if (false) {
    const handleFreeOrderSubmit = async () => {
      setIsLoading(true);
      setPaymentStatus("processing");

      try {
        const token = Cookies.get("token");
        const freeTransactionId = `free_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}`;

        console.log("🎁 Processing 100% discounted order - bypassing Stripe");

        const confirmResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/paypal/contracts/confirm-payment`,
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
              paymentMethod: "stripe",
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
          paymentProvider: "stripe",
          paymentId: freeTransactionId,
          paymentIntentId: freeTransactionId,
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
        toast({
          title: "Order Processing Failed",
          description: error.message || "Failed to process your free order",
          variant: "destructive",
        });
        onPaymentError(error.message || "Payment failed");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Free Order - 100% Discount Applied!
            </h3>
            <p className="text-green-600 mb-4">
              Your order is completely free thanks to the discount code you
              applied.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200 mb-4">
              <p className="text-sm text-green-700">
                Click the button below to complete your free order and get
                instant access.
              </p>
            </div>

            {paymentStatus === "processing" && (
              <div className="flex items-center justify-center space-x-2 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-blue-600">
                  Processing your free order...
                </span>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">
                    Order completed successfully!
                  </span>
                </div>
              </div>
            )}

            {paymentStatus === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-red-600">
                    Failed to process order. Please try again.
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleFreeOrderSubmit}
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
    );
  }

  if (paymentStatus === "success") {
    return (
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Payment Successful!
            </h3>
            <p className="text-green-600 mb-4">
              Your payment of <span className="font-semibold">${amount}</span>{" "}
              has been processed successfully.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700">
                You will receive a confirmation email shortly with your
                transaction details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Secure Payment</h3>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Lock className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Product</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-lg font-bold text-green-600">${amount}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600 mb-1">Billing Cycle</p>
                <p className="text-sm font-semibold text-gray-900">
                  {subscriptionType === "yearly"
                    ? "Annual Subscription"
                    : "Monthly Subscription"}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Card Information</span>
              </label>
              <div className="relative">
                <div className="p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#1f2937",
                          fontFamily: "Inter, system-ui, sans-serif",
                          fontWeight: "400",
                          "::placeholder": {
                            color: "#9ca3af",
                          },
                        },
                        invalid: {
                          color: "#ef4444",
                        },
                        complete: {
                          color: "#059669",
                        },
                      },
                      hidePostalCode: false,
                    }}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!stripe || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Complete Secure Payment - ${amount}
                </>
              )}
            </Button>
          </form>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <h4 className="text-sm font-semibold text-blue-800">
                Secure Payment Processing
              </h4>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              Your payment information is encrypted and secure. We accept all
              major credit cards.
            </p>
            <div className="flex items-center justify-between text-xs text-blue-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Lock className="h-3 w-3" />
                  <span>SSL Encrypted</span>
                </span>
                <span>PCI Compliant</span>
                <span>Powered by Stripe</span>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-white rounded text-blue-800 font-semibold">
                  VISA
                </span>
                <span className="px-2 py-1 bg-white rounded text-blue-800 font-semibold">
                  MC
                </span>
                <span className="px-2 py-1 bg-white rounded text-blue-800 font-semibold">
                  AMEX
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main component that wraps the form with Elements provider
export function StripeElementsPayment(props: StripePaymentProps) {
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    // Load Stripe configuration dynamically from backend
    const initStripe = async () => {
      try {
        console.log("🔄 Fetching Stripe configuration from API...");
        const settings = await publicPaymentService.getPublicSettings();

        if (!settings.stripe.enabled) {
          throw new Error("Stripe payment is currently disabled");
        }

        if (!settings.stripe.publishableKey) {
          throw new Error("Stripe publishable key not configured");
        }

        console.log("✅ Stripe configuration loaded:", {
          mode: settings.stripe.mode,
          enabled: settings.stripe.enabled,
        });

        const stripeInstance = await getStripePromise();
        setStripe(stripeInstance);
        setStripeLoading(false);
      } catch (error: any) {
        console.error("❌ Failed to load Stripe:", error);
        setStripeError(error.message || "Failed to load Stripe configuration");
        setStripeLoading(false);
      }
    };

    initStripe();
  }, []);

  if (stripeLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading Stripe payment system...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (stripeError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Payment system configuration error: {stripeError}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Elements stripe={stripe}>
      <PaymentForm {...props} />
    </Elements>
  );
}
