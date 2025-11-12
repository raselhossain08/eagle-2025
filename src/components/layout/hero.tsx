import { Button } from "@/components/ui/button";
import { Star, BarChart3 } from "lucide-react";
import Link from "next/link";
import { DisclosureTooltip } from "@/components/shared/disclosure-tooltip";

export function Hero() {
  return (
    <section className="relative bg-slate-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.1"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Eagle Investors
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-4xl lg:text-5xl">
                  Registered Investment Strategies
                </span>
                <br />
                <span className="text-gray-300 text-3xl lg:text-4xl">
                  & Active Trade Intelligence
                </span>
              </h1>

              <div className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Discover how our
                <span className="px-2">
                  <DisclosureTooltip
                    trigger="registered investment advisor"
                    content="Eagle Investors LLC is a registered investment advisor. Registration does not imply a certain level of skill or training. All investment advisory services are provided in accordance with applicable federal and state regulations."
                  />
                </span>
                equips clients with institution-style market tools, curated
                alerts, and personalized advisory services to help navigate
                every market cycle.
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">155K+</div>
                <div className="text-gray-400 text-sm">Platform Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">24/7</div>
                <div className="text-gray-400 text-sm">Market Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50</div>
                <div className="text-gray-400 text-sm">States Operating</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
              <h3 className="text-xl font-semibold text-white mb-3">
                Featured Investment & Trading Strategies
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Curated Growth Portfolios
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Dividend Income Strategies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300">Day Trading Strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Scalping Techniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Swing Trading Strategies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">Options Trading</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs italic">
                These strategies are informational and do not guarantee any
                specific investment outcomes. Past performance is not indicative
                of future results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://pe333tij.sibpages.com" target="_blank">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  Start Free Trial →
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  View Advisory Services
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-gray-300">
                  Rated 5 stars by{" "}
                  <DisclosureTooltip
                    trigger="Benzinga"
                    content="Third-party ratings and reviews are based on independent assessments by financial industry publications and user feedback platforms. Past ratings do not guarantee future performance or results. Individual experiences may vary."
                  />{" "}
                  & 4.7 stars on Google
                </div>
              </div>
              <div className="text-gray-400 text-xs leading-relaxed">
                Ratings based on independent third-party reviews by Benzinga (5
                stars) and Google Reviews (4.7 stars) as of June 2025. No
                compensation was provided for reviews. Individual experiences
                may vary.
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>

            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7NcJN1XzNhlJitdNHD92Uy1a8LbvgZ.png"
                alt="Professional Trading Interface"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating UI Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                Live Trading / Investing
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Professional Tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Footer */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <p className="text-gray-400 text-sm text-center">
            <strong className="text-white">Important Disclosure:</strong> All
            investments involve risk, including the potential loss of principal.
            Past performance does not guarantee future results. This material is
            for informational purposes only and should not be construed as
            investment advice. Please consult with a qualified financial advisor
            before making investment decisions.{" "}
            <Link
              href="/disclosures"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              View Full Disclosures
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
