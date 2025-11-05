import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Mail,
  MessageCircle,
  Phone,
  Clock,
  Gift,
} from "lucide-react";

export default function AccessGuidePage() {
  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Link href="/hub/script/scripts">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-brand-bg-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scripts
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                How to Access Your Scripts
              </h1>
              <p className="text-yellow-400 font-semibold text-lg">
                Complete Step-by-Step Guide
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Follow this comprehensive guide to access your exclusive Eagle
            Investors trading scripts on TradingView. Our scripts are
            invite-only and exclusive to Infinity members.
          </p>
        </div>
      </div>

      {/* Invite-Only Access Warning */}
      <Card className="bg-yellow-500/10 border-2 border-yellow-500/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">
                Invite-Only Access
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our trading scripts are exclusive to Eagle Investors Infinity
                members and are provided via invite-only access on TradingView.
                Scripts are not publicly available and require membership
                verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Process */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white">Access Process</h2>

        {/* Step 1 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow flex-shrink-0">
                <span className="text-black font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Verify Your Infinity Membership
                </h3>
                <p className="text-gray-400">
                  Ensure you have an active Infinity subscription
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-brand-green font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Requirements
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Active Infinity membership ($127/month)</li>
                  <li>• Verified Eagle Investors account</li>
                  <li>• TradingView account (Basic plan or higher)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-brand-cyan font-bold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h4>
                <p className="text-gray-300">
                  Your membership email must match your TradingView account
                  email for verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow flex-shrink-0">
                <span className="text-black font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Submit Your TradingView Username
                </h3>
                <p className="text-gray-400">
                  Provide your TradingView username for script access
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-brand-cyan font-bold mb-4">
                How to Find Your TradingView Username
              </h4>
              <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                <li>Log into your TradingView account</li>
                <li>Click on your profile picture (top right)</li>
                <li>Your username is displayed in the dropdown menu</li>
                <li>Copy this exact username (case-sensitive)</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-brand-bg-dark border-brand-border text-center">
                <CardContent className="p-6">
                  <Mail className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Email Support</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Send username via email
                  </p>
                  <Button className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-white">
                    Contact
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-brand-bg-dark border-brand-border text-center">
                <CardContent className="p-6">
                  <MessageCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Community Chat</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Submit via Discord/Telegram
                  </p>
                  <Button className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-white">
                    Contact
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-brand-bg-dark border-brand-border text-center">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Private Session</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Provide during 1-on-1 call
                  </p>
                  <Button className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-white">
                    Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow flex-shrink-0">
                <span className="text-black font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Wait for Script Invitation
                </h3>
                <p className="text-gray-400">Receive access within 24 hours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-brand-green font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Processing Time
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Standard processing: 12-24 hours</li>
                  <li>• Business days: Monday-Friday</li>
                  <li>• Weekend requests: Processed Monday</li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  What You'll Receive
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• TradingView script invitation</li>
                  <li>• Access to all 3 scripts</li>
                  <li>• Setup instructions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow flex-shrink-0">
                <span className="text-black font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Accept Invitation & Add to Charts
                </h3>
                <p className="text-gray-400">
                  Complete the setup process on TradingView
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-white font-bold mb-4">Setup Instructions:</h4>
              <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                <li>
                  Check your TradingView notifications for script invitations
                </li>
                <li>
                  Accept each script invitation (you'll receive 3 separate
                  invites)
                </li>
                <li>Go to your TradingView chart and click "Indicators"</li>
                <li>Search for "Eagle" to find your invited scripts</li>
                <li>Add the scripts to your chart and configure settings</li>
                <li>Set up alerts if desired for real-time notifications</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TradingView Account Requirements */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          TradingView Account Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-brand-bg-light border-brand-green">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-brand-green mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Basic Plan</h3>
              <p className="text-gray-400 text-sm mb-4">
                Minimum required plan
              </p>
              <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm font-bold">
                ✓ Compatible
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-bg-light border-brand-green">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-brand-green mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Pro Plan</h3>
              <p className="text-gray-400 text-sm mb-4">Enhanced features</p>
              <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm font-bold">
                ✓ Compatible
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-bg-light border-brand-green">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-brand-green mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">
                Premium Plan
              </h3>
              <p className="text-gray-400 text-sm mb-4">Full access</p>
              <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm font-bold">
                ✓ Compatible
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-lg p-4">
          <p className="text-brand-primary text-sm">
            <strong>Note:</strong> Our scripts work with TradingView Basic plan
            or higher. Free accounts cannot access invite-only scripts.
          </p>
        </div>
      </div>

      {/* Need Help Section */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Help with Access?
          </h3>
          <p className="text-gray-400 mb-6">
            Our support team is here to help you get set up with your trading
            scripts quickly and easily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3">
              <MessageCircle className="w-5 h-5 mr-2" />
              Community Support
            </Button>
            <Button
              variant="outline"
              className="border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 px-8 py-3 bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2" />
              Book Support Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer Section */}
      <div className="bg-brand-bg-light rounded-2xl p-8 border border-brand-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/eagle-investors-logo.png"
                alt="Eagle Investors"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-white">
                Eagle Investors
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Eagle Investors is an investment adviser registered in applicable
              jurisdictions. Registration does not imply a certain level of
              skill or training.
            </p>
            <div className="flex text-yellow-400 mb-2">{"★".repeat(5)}</div>
            <p className="text-xs text-gray-500">Rated 5 stars by Benzinga</p>
            <p className="text-xs text-gray-500 mt-2">
              This rating is based on independent third-party reviews. No
              compensation was paid. Testimonials may not be representative of
              other clients and are not a guarantee of future performance.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Advisory Plans</li>
              <li>AI Advisor</li>
              <li>Trading Scripts</li>
              <li>Education Library</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Legal & Disclosures */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Legal & Disclosures
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ADV Part 2A & 2B</li>
              <li>Form CRS</li>
              <li>Risk Disclosure</li>
              <li>Code of Ethics</li>
              <li>AI Advisor Disclosure</li>
              <li>Testimonials Disclosure</li>
              <li>Cybersecurity Policy</li>
            </ul>
          </div>
        </div>

        {/* Important Disclosures */}
        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-yellow-400 font-bold mb-3">
                Important Disclosures
              </h4>
              <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">Investment Risk:</strong> All
                  investments involve risk, including the potential loss of
                  principal. Past performance does not guarantee future results.
                  The material is for informational purposes only and should not
                  be construed as investment advice.
                </p>
                <p>
                  <strong className="text-white">Advisory Services:</strong>{" "}
                  Eagle Investors provides investment advisory services. Please
                  consult with a qualified financial advisor before making
                  investment decisions.
                </p>
                <p>
                  <strong className="text-white">
                    Trading Scripts & AI Tools:
                  </strong>{" "}
                  These tools are designed to support experienced investors.
                  Backtested results are hypothetical, do not reflect actual
                  trading, and are not guarantees of future results. Individual
                  outcomes will vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
