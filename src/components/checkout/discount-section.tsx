"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Tag, 
  X, 
  Loader2, 
  Check,
  AlertCircle,
  Gift,
  Percent
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useDiscount from "@/hooks/use-discount";
import { discountService } from "@/lib/services/api/discount";

interface DiscountSectionProps {
  orderAmount: number;
  quantity?: number;
  onDiscountApplied?: (discountAmount: number, finalAmount: number) => void;
  onDiscountRemoved?: () => void;
  className?: string;
}

export function DiscountSection({
  orderAmount,
  quantity = 1,
  onDiscountApplied,
  onDiscountRemoved,
  className = ""
}: DiscountSectionProps) {
  const {
    discountCode,
    appliedDiscount,
    isVerifying,
    error,
    setDiscountCode,
    verifyDiscount,
    clearDiscount,
    hasValidDiscount,
    discountAmount,
    finalAmount,
    savingsPercentage
  } = useDiscount(orderAmount);

  // Get authentication status and available methods
  const authStatus = discountService.getUserAuthStatus();
  const availableMethods = discountService.getAvailableMethods();

  const handleApplyDiscount = async () => {
    const success = await verifyDiscount(orderAmount, quantity);
    
    if (success && appliedDiscount) {
      onDiscountApplied?.(discountAmount, finalAmount);
    }
  };

  const handleRemoveDiscount = () => {
    clearDiscount();
    onDiscountRemoved?.();
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && discountCode.trim() && !isVerifying) {
      handleApplyDiscount();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Discount Code Input Section */}
      <Card className="bg-slate-700/30 border-slate-600">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-400" />
              <Label className="text-slate-300 font-medium">
                Have a discount code?
              </Label>
            </div>
            
            {/* Authentication Status Indicator */}
            <div className="flex items-center gap-2">
              {authStatus.isAuthenticated ? (
                <Badge className="bg-green-500/20 text-green-400 text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Authenticated
                </Badge>
              ) : (
                <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                  Guest Mode
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {!hasValidDiscount ? (
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    disabled={isVerifying}
                  />
                </div>
                <Button
                  onClick={handleApplyDiscount}
                  disabled={!discountCode.trim() || isVerifying}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  title={
                    authStatus.isAuthenticated 
                      ? "Verify with authenticated benefits" 
                      : "Verify as guest (limited features)"
                  }
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Apply
                      {authStatus.isAuthenticated && (
                        <Check className="w-3 h-3 ml-1" />
                      )}
                    </>
                  )}
                </Button>
              </div>
            ) : (
              // Applied discount display
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {appliedDiscount?.discount.name}
                        </span>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          {appliedDiscount?.discount.code}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300">
                        {appliedDiscount?.discount.description}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveDiscount}
                    className="text-slate-400 hover:text-white hover:bg-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Discount Details */}
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Discount Type:</span>
                    <div className="flex items-center gap-1">
                      {appliedDiscount?.discount.type === 'percentage' ? (
                        <Percent className="w-3 h-3 text-green-400" />
                      ) : (
                        <Gift className="w-3 h-3 text-green-400" />
                      )}
                      <span className="text-white capitalize">
                        {appliedDiscount?.discount.type.replace('_', ' ')}
                      </span>
                      {appliedDiscount?.discount.type === 'percentage' && (
                        <span className="text-green-400 font-medium">
                          {appliedDiscount.discount.value}%
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-slate-300">Your Savings:</span>
                    <span className="text-green-400 font-medium">
                      ${discountAmount.toLocaleString()} ({savingsPercentage}% off)
                    </span>
                  </div>

                  {appliedDiscount?.usageInfo.remainingUses && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-slate-300">Remaining Uses:</span>
                      <span className="text-orange-400">
                        {appliedDiscount.usageInfo.remainingUses}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <Alert className="bg-red-500/10 border-red-500/30">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Authentication Info */}
            {!authStatus.isAuthenticated && (
              <Alert className="bg-blue-500/10 border-blue-500/30">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300 text-sm">
                  <strong>Guest Mode:</strong> You can verify public discount codes. 
                  <a href="/login" className="text-blue-400 hover:text-blue-300 underline ml-1">
                    Log in
                  </a> for member-exclusive discounts and to apply codes to your account.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Price Summary Section */}
      {hasValidDiscount && (
        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Subtotal:</span>
                <span className="text-white">${orderAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">
                  Discount ({appliedDiscount?.discount.code}):
                </span>
                <span className="text-green-400">
                  -${discountAmount.toLocaleString()}
                </span>
              </div>
              
              <Separator className="bg-slate-600" />
              
              <div className="flex justify-between font-semibold">
                <span className="text-white">Total:</span>
                <div className="text-right">
                  <div className="text-lg text-white">
                    ${finalAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-400">
                    You save ${discountAmount.toLocaleString()}!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default DiscountSection;