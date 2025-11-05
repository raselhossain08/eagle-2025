"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UpgradeButton,
  DiamondUpgradeButton,
  InfinityUpgradeButton,
  UpgradePromptCard,
} from "@/components/subscription/upgrade-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/authContext";

export default function SubscriptionUpgradePage() {
  const { profile } = useAuth();
  const [mockCurrentPackage, setMockCurrentPackage] = useState<
    "basic" | "diamond" | "infinity" | "none"
  >("basic");

  const currentSubscription = profile?.subscription?.toLowerCase() || "basic";

  return (
    <div className="min-h-screen bg-brand-bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Subscription Management & Upgrade System
          </h1>
          <p className="text-gray-400">
            Demonstration of the new upgrade button components and subscription
            contract modal integration.
          </p>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-8">
            <TabsTrigger value="buttons">Upgrade Buttons</TabsTrigger>
            <TabsTrigger value="cards">Upgrade Cards</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-8">
            <Card className="bg-brand-bg-light border-brand-border">
              <CardHeader>
                <CardTitle className="text-white">
                  Individual Upgrade Buttons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">
                      Diamond Upgrade Buttons
                    </h3>
                    <div className="space-y-3">
                      <DiamondUpgradeButton currentPackage="basic" size="sm" />
                      <DiamondUpgradeButton currentPackage="basic" size="md" />
                      <DiamondUpgradeButton
                        currentPackage="basic"
                        size="lg"
                        className="w-full"
                      />
                      <DiamondUpgradeButton
                        currentPackage="basic"
                        size="xl"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">
                      Infinity Upgrade Buttons
                    </h3>
                    <div className="space-y-3">
                      <InfinityUpgradeButton currentPackage="basic" size="sm" />
                      <InfinityUpgradeButton currentPackage="basic" size="md" />
                      <InfinityUpgradeButton
                        currentPackage="basic"
                        size="lg"
                        className="w-full"
                      />
                      <InfinityUpgradeButton
                        currentPackage="diamond"
                        size="xl"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Button Variants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DiamondUpgradeButton
                      currentPackage="basic"
                      variant="primary"
                      size="md"
                    />
                    <DiamondUpgradeButton
                      currentPackage="basic"
                      variant="secondary"
                      size="md"
                    />
                    <DiamondUpgradeButton
                      currentPackage="basic"
                      variant="outline"
                      size="md"
                    />
                    <DiamondUpgradeButton
                      currentPackage="basic"
                      variant="ghost"
                      size="md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UpgradePromptCard
                currentPackage="basic"
                targetPackages={["diamond", "infinity"]}
                title="Upgrade Your Experience"
                description="Take your trading to the next level with premium features and exclusive access."
              />

              <UpgradePromptCard
                currentPackage="diamond"
                targetPackages={["infinity"]}
                title="Go Infinity"
                description="Unlock the ultimate trading experience with personal coaching and custom strategies."
              />
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-8">
            <Card className="bg-brand-bg-light border-brand-border">
              <CardHeader>
                <CardTitle className="text-white">
                  Test Different User Scenarios
                </CardTitle>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => setMockCurrentPackage("basic")}
                    variant={
                      mockCurrentPackage === "basic" ? "default" : "outline"
                    }
                  >
                    Basic User
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setMockCurrentPackage("diamond")}
                    variant={
                      mockCurrentPackage === "diamond" ? "default" : "outline"
                    }
                  >
                    Diamond User
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setMockCurrentPackage("infinity")}
                    variant={
                      mockCurrentPackage === "infinity" ? "default" : "outline"
                    }
                  >
                    Infinity User
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setMockCurrentPackage("none")}
                    variant={
                      mockCurrentPackage === "none" ? "default" : "outline"
                    }
                  >
                    No Package
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-brand-bg-dark/50 p-4 rounded-lg">
                  <p className="text-white mb-4">
                    Current Package:{" "}
                    <Badge variant="outline">{mockCurrentPackage}</Badge>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DiamondUpgradeButton
                      currentPackage={mockCurrentPackage}
                      size="lg"
                      className="w-full"
                    />
                    <InfinityUpgradeButton
                      currentPackage={mockCurrentPackage}
                      size="lg"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <UpgradePromptCard
                    currentPackage={mockCurrentPackage}
                    targetPackages={["diamond"]}
                    title="Diamond Upgrade"
                    description="Upgrade to Diamond for premium features and enhanced trading tools."
                  />

                  <UpgradePromptCard
                    currentPackage={mockCurrentPackage}
                    targetPackages={["infinity"]}
                    title="Infinity Upgrade"
                    description="Experience the ultimate with personal coaching and unlimited features."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-8">
            <Card className="bg-brand-bg-light border-brand-border">
              <CardHeader>
                <CardTitle className="text-white">
                  Integration Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">
                      Features Included
                    </h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>✅ Contract display in modal (not PDF)</li>
                      <li>✅ Digital signature capture</li>
                      <li>✅ PDF generation after signing</li>
                      <li>✅ Backend storage</li>
                      <li>✅ PayPal integration</li>
                      <li>✅ Responsive design</li>
                      <li>✅ Multiple package support</li>
                      <li>✅ Upgrade flow management</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">
                      Technical Implementation
                    </h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>🔧 React + TypeScript</li>
                      <li>🔧 Tailwind CSS styling</li>
                      <li>🔧 Shadcn/ui components</li>
                      <li>🔧 Express.js API</li>
                      <li>🔧 HTML-PDF generation</li>
                      <li>🔧 MongoDB storage</li>
                      <li>🔧 JWT authentication</li>
                      <li>🔧 File upload handling</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-brand-bg-dark/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Live Demo</h4>
                  <p className="text-gray-300 mb-4">
                    Click the button below to test the complete subscription
                    flow:
                  </p>
                  <DiamondUpgradeButton
                    currentPackage={currentSubscription as any}
                    size="lg"
                    customText="🚀 Test Complete Subscription Flow"
                    className="w-full md:w-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
