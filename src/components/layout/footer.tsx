import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Platinum_Logo_Eagle%20%281%29-qCpKcHYjTtL5kG2dhAmgYRJs468hxW.png"
                alt="Eagle Investors Logo"
                className="w-8 h-8"
              />
              <span className="text-white font-bold text-lg">Eagle Investors</span>
            </div>
            <p className="text-gray-400">Professional trading and investment advice for traders worldwide.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-cyan-400">
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link href="/advising" className="text-gray-400 hover:text-cyan-400">
                  1-on-1 Advising
                </Link>
              </li>
              <li>
                <Link href="/asset-management" className="text-gray-400 hover:text-cyan-400">
                  Asset Management
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-gray-400 hover:text-cyan-400">
                  Education Library
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclosures" className="text-gray-400 hover:text-cyan-400">
                  Disclosures
                </Link>
              </li>
              <li>
                <Link href="/disclosures/privacy-policy" className="text-gray-400 hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <div className="space-y-6">
              <Link href="https://pe333tij.sibpages.com" target="_blank">
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Join Free</Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                >
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* SEC Marketing Rule Compliance Footer */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
            <p className="text-gray-400 text-sm text-center leading-relaxed">
              <strong className="text-white">Eagle Investors LLC is a Registered Investment Adviser.</strong> All
              investments involve risk, including the potential loss of principal. Nothing on this site should be
              construed as personalized investment advice. Please consult a qualified advisor before making investment
              decisions.
            </p>
          </div>
          <p className="text-gray-400 text-center text-sm">© 2024 Eagle Investors LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
