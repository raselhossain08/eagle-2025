"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, FileSignature } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProductPurchaseCardProps {
  productType: string;
  productName: string;
  price: string;
  description: string;
  features: string[];
}

export function ProductPurchaseCard({
  productType,
  productName,
  price,
  description,
  features,
}: ProductPurchaseCardProps) {
  const router = useRouter();

  const handlePurchaseClick = () => {
    // Create cart item for this product
    const cartItem = {
      id: `product-${productType}`,
      name: productName,
      price: parseFloat(price.replace("$", "")),
      type: productType,
      description,
      features,
    };

    // Store in localStorage
    localStorage.setItem("cart", JSON.stringify([cartItem]));

    toast({
      title: "Added to cart!",
      description: `${productName} has been added to your cart.`,
    });

    // Navigate to checkout
    router.push("/checkout");
  };

  return (
    <Card className="bg-brand-bg-light border-brand-border">
      <CardHeader>
        <CardTitle className="text-white text-xl">{productName}</CardTitle>
        <div className="text-3xl font-bold text-brand-primary">${price}</div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400">{description}</p>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-300 text-sm flex items-center">
              <span className="w-2 h-2 bg-brand-primary rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          onClick={handlePurchaseClick}
          className="w-full bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Purchase Now
        </Button>

        <div className="flex items-center justify-center text-xs text-gray-500">
          <FileSignature className="w-3 h-3 mr-1" />
          Digital contract signing required
        </div>
      </CardContent>
    </Card>
  );
}
