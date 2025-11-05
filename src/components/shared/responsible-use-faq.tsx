"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ResponsibleUseFAQProps {
  title?: string
  context?: "ai-advisor" | "trading-scripts" | "mentorship"
}

export function ResponsibleUseFAQ({
  title = "How should I use these tools responsibly?",
  context = "ai-advisor",
}: ResponsibleUseFAQProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getContextualContent = () => {
    switch (context) {
      case "ai-advisor":
        return "Our AI Advisor is designed to support experienced traders with market insights and analysis. It is not a substitute for professional portfolio management or fiduciary guidance. Always consider your personal financial situation and consult with a qualified financial advisor before making investment decisions."
      case "trading-scripts":
        return "Our trading scripts are designed to support experienced traders with algorithmic analysis. They are not substitutes for professional portfolio management or fiduciary guidance. Always consider your personal financial situation, risk tolerance, and investment objectives before using these tools."
      case "mentorship":
        return "Our mentorship programs are designed to provide educational support and strategy development guidance. They are not substitutes for professional portfolio management or fiduciary guidance. Always consider your personal financial situation and consult with a qualified financial advisor for personalized investment advice."
      default:
        return "Our tools are designed to support experienced traders. They are not substitutes for professional portfolio management or fiduciary guidance. Always consider your personal financial situation."
    }
  }

  return (
    <Card className="bg-brand-bg-light border-brand-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-brand-bg-dark/30 transition-colors">
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-cyan" />
                <span className="text-lg">{title}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <p className="text-gray-300 text-sm leading-relaxed">{getContextualContent()}</p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
