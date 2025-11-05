"use client"

import type React from "react"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ComplianceTooltipProps {
  children: React.ReactNode
  content?: string
}

export function ComplianceTooltip({
  children,
  content = "This feature is designed for experienced investors. Past performance is not indicative of future results.",
}: ComplianceTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            {children}
            <Info className="w-4 h-4 text-yellow-400 hover:text-yellow-300 transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-brand-bg-dark border-yellow-500/50 text-gray-300">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
