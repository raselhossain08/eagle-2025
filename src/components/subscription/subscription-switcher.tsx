"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SubscriptionType = "None" | "Basic" | "Diamond" | "Infinity" | "Script";

interface SubscriptionSwitcherProps {
  currentSubscription: SubscriptionType;
  onSubscriptionChange: (subscription: SubscriptionType) => void;
}

export function SubscriptionSwitcher({
  currentSubscription,
  onSubscriptionChange,
}: SubscriptionSwitcherProps) {
  const subscriptions: {
    value: SubscriptionType;
    label: string;
    color: string;
  }[] = [
    { value: "None", label: "No Subscription", color: "bg-gray-500" },
    { value: "Basic", label: "Basic (Free)", color: "bg-blue-500" },
    { value: "Diamond", label: "Diamond Package", color: "bg-purple-500" },
    { value: "Infinity", label: "Infinity Package", color: "bg-yellow-500" },
    { value: "Script", label: "Script Package", color: "bg-green-500" },
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-brand-bg-light border-brand-border">
      <CardHeader>
        <CardTitle className="text-white text-center">
          🧪 Subscription Tester
        </CardTitle>
        <p className="text-gray-400 text-sm text-center">
          Test different subscription levels
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {subscriptions.map((sub) => (
          <div key={sub.value} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={`${sub.color} text-white`}>{sub.label}</Badge>
              {currentSubscription === sub.value && (
                <span className="text-yellow-400 text-sm">← Active</span>
              )}
            </div>
            <Button
              size="sm"
              variant={
                currentSubscription === sub.value ? "secondary" : "outline"
              }
              onClick={() => onSubscriptionChange(sub.value)}
              disabled={currentSubscription === sub.value}
            >
              {currentSubscription === sub.value ? "Current" : "Switch"}
            </Button>
          </div>
        ))}

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
          <p className="text-yellow-400 text-sm">
            <strong>Current:</strong>{" "}
            {subscriptions.find((s) => s.value === currentSubscription)?.label}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Dashboard will redirect based on subscription level
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
