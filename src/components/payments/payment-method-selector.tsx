"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PayPalPayment } from "@/components/payments/paypal-payment";
import { StripeElementsPayment } from "@/components/payments/stripe-elements-payment";
import { CreditCard, DollarSign } from "lucide-react";

interface PaymentMethodSelectorProps {
  contractId: string;
  amount: string;
  productName: string;
  subscriptionType?: "monthly" | "yearly";
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError?: (error: string) => void;
  discountCode?: string;
  discountAmount?: number;
}

type PaymentMethod = "paypal" | "stripe" | null;

export function PaymentMethodSelector({
  contractId,
  amount,
  productName,
  subscriptionType = "monthly",
  onPaymentSuccess,
  onPaymentError = () => {},
  discountCode,
  discountAmount,
}: PaymentMethodSelectorProps) {
  // Start with no method selected so users can choose
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessingFree, setIsProcessingFree] = useState(false);

  // Check if order is free (100% discount)
  const isFreeOrder = parseFloat(amount) === 0;

  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment success in selector:", paymentData);
    onPaymentSuccess({
      ...paymentData,
      paymentProvider: selectedMethod,
    });
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error in selector:", error);
    onPaymentError(error);
  };

  const handleFreePurchase = async () => {
    try {
      setIsProcessingFree(true);
      console.log("🎉 Processing free order (100% discount)...", {
        contractId,
        amount: 0,
        discountCode,
        discountAmount,
      });

      // Simulate free order completion
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handlePaymentSuccess({
        paymentMethod: "free",
        paymentId: `FREE-${Date.now()}`,
        contractId,
        amount: "0.00",
        status: "completed",
        discountCode,
        discountAmount,
        message: "Order completed with 100% discount",
      });
    } catch (error: any) {
      console.error("❌ Error processing free order:", error);
      handlePaymentError(error.message || "Failed to process free order");
    } finally {
      setIsProcessingFree(false);
    }
  };

  // Handle free orders (100% discount)
  if (isFreeOrder) {
    return (
      <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Badge className="bg-green-600 text-white text-lg px-4 py-1">
              100% OFF
            </Badge>
            <span>Free Order!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-green-700">
              🎉 Your discount code gives you this order completely free!
            </p>
            <p className="text-sm text-gray-600">{productName}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              {discountCode && (
                <Badge variant="outline" className="bg-white">
                  Code: {discountCode}
                </Badge>
              )}
              <span>
                Original:{" "}
                <span className="line-through">
                  ${(parseFloat(amount) + (discountAmount || 0)).toFixed(2)}
                </span>
              </span>
              <span className="text-2xl font-bold text-green-600">→ $0.00</span>
            </div>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
            onClick={handleFreePurchase}
            disabled={isProcessingFree}
          >
            {isProcessingFree ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Processing...
              </>
            ) : (
              <>✓ Complete Free Order</>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            No payment required. Click to complete your order.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (selectedMethod === "paypal") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              PayPal
            </Badge>
            <span className="text-sm text-gray-600">
              Selected Payment Method
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>

        <PayPalPayment
          contractId={contractId}
          amount={amount}
          productName={productName}
          subscriptionType={subscriptionType}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          discountCode={discountCode}
          discountAmount={discountAmount}
        />
      </div>
    );
  }

  if (selectedMethod === "stripe") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Credit Card
            </Badge>
            <span className="text-sm text-gray-600">
              Selected Payment Method
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>

        <StripeElementsPayment
          contractId={contractId}
          amount={amount}
          productName={productName}
          subscriptionType={subscriptionType}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          discountCode={discountCode}
          discountAmount={discountAmount}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">
          Choose Your Payment Method
        </h3>
        <p className="text-white">
          Select how you'd like to pay for {productName}
        </p>
      </div>

      <div className="grid gap-4">
        {/* PayPal Option */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
          onClick={() => setSelectedMethod("paypal")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">PayPal</div>
                  <div className="text-sm text-gray-500 font-normal">
                    Pay with your PayPal account
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setSelectedMethod("paypal")}
            >
              Pay with PayPal
            </Button>
          </CardContent>
        </Card>

        {/* Stripe/Credit Card Option */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300"
          onClick={() => setSelectedMethod("stripe")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Credit / Debit Card</div>
                  <div className="text-sm text-gray-500 font-normal">
                    Pay with Visa, Mastercard, or American Express
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Secure
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setSelectedMethod("stripe")}
            >
              Pay with Card
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
        <div className="text-2xl font-bold mb-2 text-white">
          Total: ${amount}
        </div>
        <p className="text-sm text-gray-500">
          All payments are secure and encrypted
        </p>
      </div>
    </div>
  );
}
