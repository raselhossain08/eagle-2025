import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  AlertTriangle,
  FileText,
  Shield,
  Users,
  Scale,
} from "lucide-react";

export default function AIAdvisorDisclosurePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/hub/infinity/ai-advisor">
          <Button
            variant="outline"
            className="border-brand-border text-white hover:bg-brand-bg-dark bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AI Advisor
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <FileText className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                AI Advisor Disclaimer
              </h1>
              <p className="text-yellow-400 font-semibold text-lg">
                Important Legal Information
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Please read this disclaimer carefully before using the Eagle
            Investors AI Advisor Bot. This information is essential for
            understanding the limitations and proper use of our AI-powered
            investment tool.
          </p>
        </div>
      </div>

      {/* Main Disclaimer Content */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white text-2xl">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            Disclaimer for Eagle Investors LLC AI Advisor Bot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
            <p className="text-gray-300 leading-relaxed">
              Eagle Investors LLC provides its AI Advisor Bot as an educational
              and informational tool designed to assist users in understanding
              market trends, exploring investment opportunities, and developing
              financial strategies. While the AI Advisor Bot leverages advanced
              algorithms and historical data to provide insights, it is
              important to note the following:
            </p>
          </div>

          {/* Disclaimer Sections */}
          <div className="space-y-6">
            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">
                  Not a Substitute for Professional Advice
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                The AI Advisor Bot is not a licensed financial advisor, and its
                outputs should not be interpreted as personalized financial,
                legal, or tax advice. Users should consult with a qualified
                professional for specific investment decisions.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">
                  Limitations of AI Capabilities
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                The AI relies on historical data and programmed algorithms. It
                does not account for real-time market changes, individual
                financial circumstances, or unforeseen global events. As a
                result, its recommendations may not always reflect current
                market conditions or be tailored to individual goals.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">
                  No Guarantee of Accuracy or Success
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Investment strategies and market forecasts generated by the AI
                Advisor Bot are inherently subject to uncertainty. Past
                performance is not indicative of future results, and there is no
                guarantee that the information provided will result in
                profitable investments.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <Scale className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">
                  User Responsibility
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                All decisions based on insights from the AI Advisor Bot are
                solely the responsibility of the user. Eagle Investors LLC is
                not liable for any losses, damages, or negative outcomes
                resulting from reliance on the AI's recommendations.
              </p>
            </div>
          </div>

          {/* Acknowledgment Section */}
          <div className="bg-brand-bg-dark rounded-lg p-6 border border-brand-border">
            <h3 className="text-lg font-semibold text-white mb-4">
              Acknowledgment and Agreement
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              By using the AI Advisor Bot, you acknowledge and accept its
              limitations and agree to utilize it at your own discretion. For
              detailed inquiries, professional guidance, or further assistance,
              please contact a licensed financial professional.
            </p>
            <p className="text-gray-400 text-sm">
              For more information, please review our{" "}
              <span className="text-brand-primary cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-brand-primary cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Need Professional Guidance?
          </h3>
          <p className="text-gray-300 mb-4">
            If you have questions about your specific financial situation or
            need personalized investment advice, consider consulting with a
            licensed financial professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/hub/infinity/private-sessions">
              <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-semibold shadow-glow-cyan transition-all duration-200 hover:scale-105">
                Explore Private Sessions
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-brand-border text-white hover:bg-brand-bg-dark bg-transparent"
            >
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Back to AI Advisor */}
      <div className="text-center">
        <Link href="/hub/infinity/ai-advisor">
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold shadow-glow-yellow transition-all duration-200 hover:scale-105">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to AI Advisor
          </Button>
        </Link>
      </div>
    </div>
  );
}
