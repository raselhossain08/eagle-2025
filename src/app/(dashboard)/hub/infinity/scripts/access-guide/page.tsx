import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function AccessGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/hub/infinity/scripts">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scripts
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                How to Access Your Scripts
              </h1>
              <p className="text-yellow-400 font-semibold text-lg">
                Complete Setup Guide
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Follow this step-by-step guide to access your Eagle Investors
            educational trading scripts on TradingView. All scripts are provided
            for educational purposes only.
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="bg-yellow-500/10 border-2 border-yellow-500/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-2">
                Educational Tools Only
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                These scripts are educational tools designed to help you learn
                market analysis concepts. They do not guarantee profits or
                predict future market movements. Always practice with paper
                trading first and never risk more than you can afford to lose.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Access Process</h2>

        {/* Step 1 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">1</span>
              </div>
              Verify Your Infinity Membership
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Ensure you have an active Eagle Investors Infinity membership.
              Script access is exclusive to Infinity members.
            </p>
            <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">
                  Membership Requirements:
                </span>
              </div>
              <ul className="text-gray-300 text-sm space-y-1 ml-8">
                <li>• Active Infinity subscription ($127/month)</li>
                <li>• Verified account in good standing</li>
                <li>• Completed onboarding process</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">2</span>
              </div>
              Create Your TradingView Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              You'll need a TradingView account to access the scripts. We
              recommend a Pro or Pro+ plan for the best experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-semibold mb-2">
                  Free Account
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Basic script access</li>
                  <li>• Limited indicators</li>
                  <li>• Ads present</li>
                </ul>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-green-500/20">
                <h4 className="text-green-400 font-semibold mb-2">
                  Pro/Pro+ (Recommended)
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Full script functionality</li>
                  <li>• Multiple indicators</li>
                  <li>• Ad-free experience</li>
                  <li>• Advanced features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">3</span>
              </div>
              Submit Your TradingView Username
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Contact our support team with your TradingView username to receive
              script invitations.
            </p>
            <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">
                  Contact Methods:
                </span>
              </div>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>• Discord: Message @EagleSupport</p>
                <p>• Email: scripts@eagleinvestors.com</p>
                <p>• Hub Support: Use the contact form</p>
              </div>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <p className="text-yellow-400 text-sm font-semibold mb-1">
                Required Information:
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Your exact TradingView username</li>
                <li>• Your Eagle Investors email address</li>
                <li>• Which scripts you want access to</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">4</span>
              </div>
              Wait for Script Invitation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Our team will send you TradingView script invitations within 24
              hours during business days.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">
                    Processing Time:
                  </span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Business hours: Within 4 hours</li>
                  <li>• Weekends: Next business day</li>
                  <li>• Holidays: May be delayed</li>
                </ul>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">
                    What You'll Receive:
                  </span>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• TradingView notification</li>
                  <li>• Email confirmation</li>
                  <li>• Setup instructions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">5</span>
              </div>
              Accept Invitation & Add Scripts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Accept the TradingView invitation and add the scripts to your
              charts for educational use.
            </p>
            <div className="bg-brand-bg-dark/50 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">
                  Getting Started:
                </span>
              </div>
              <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                <li>Check your TradingView notifications</li>
                <li>Accept the script invitation</li>
                <li>Open a chart on TradingView</li>
                <li>Add the script from your indicators</li>
                <li>Start with paper trading to learn</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Section */}
      <Card className="bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border-brand-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-green" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            If you encounter any issues during the setup process, our support
            team is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-brand-bg-dark/30 rounded-lg">
              <MessageSquare className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">Discord Support</h4>
              <p className="text-gray-400 text-sm">Fastest response time</p>
            </div>
            <div className="text-center p-4 bg-brand-bg-dark/30 rounded-lg">
              <Users className="w-8 h-8 text-brand-green mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">Community Help</h4>
              <p className="text-gray-400 text-sm">Learn from other members</p>
            </div>
            <div className="text-center p-4 bg-brand-bg-dark/30 rounded-lg">
              <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">Documentation</h4>
              <p className="text-gray-400 text-sm">Detailed setup guides</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Scripts */}
      <div className="text-center">
        <Link href="/hub/infinity/scripts">
          <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold px-8 py-3">
            Back to Scripts Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
