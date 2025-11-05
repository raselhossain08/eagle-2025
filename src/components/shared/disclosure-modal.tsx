"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

interface DisclosureModalProps {
  trigger: string
  title: string
  content: string
  className?: string
}

export function DisclosureModal({ trigger, title, content, className = "" }: DisclosureModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`text-cyan-400 underline decoration-dotted hover:text-cyan-300 transition-colors ${className}`}
        >
          {trigger}
          <sup className="text-xs ml-1">ⓘ</sup>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-cyan-400">
            <Info className="w-5 h-5" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base leading-relaxed pt-4">{content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
