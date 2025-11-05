"use client"

import { useState } from "react"
import { Info } from "lucide-react"

interface DisclosureTooltipProps {
  trigger: string
  content: string
  className?: string
}

export function DisclosureTooltip({ trigger, content, className = "" }: DisclosureTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <span className="relative inline-block">
      <button
        className={`text-cyan-400 underline decoration-dotted hover:text-cyan-300 transition-colors cursor-help ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {trigger}
        <sup className="text-xs ml-1">ⓘ</sup>
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-2xl max-w-sm w-max">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-200 text-sm leading-relaxed">{content}</span>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-800"></div>
            </div>
          </div>
        </div>
      )}
    </span>
  )
}
