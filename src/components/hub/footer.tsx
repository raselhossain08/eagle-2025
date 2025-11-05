import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  package?: string;
}

export default function Footer({
  package: packageName = "basic",
}: FooterProps) {
  return (
    <footer className="bg-brand-bg-light border-t border-brand-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/eagle-investors-logo.png"
                alt="Eagle Investors"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-white">
                Eagle Investors
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Eagle Investors is an investment adviser registered in applicable
              jurisdictions. Registration does not imply a certain level of
              skill or training.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">{"★".repeat(5)}</div>
              <span className="text-sm text-gray-400">
                Rated 5 stars by Benzinga
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This rating is based on independent third-party reviews. No
              compensation was paid. Testimonials may not be representative of
              other clients and are not a guarantee of future performance.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href={`/hub/${packageName}/subscription`}
                  className="hover:text-brand-primary transition-colors"
                >
                  Advisory Plans
                </Link>
              </li>
              <li>
                <Link
                  href={`/hub/${packageName}/ai-advisor`}
                  className="hover:text-brand-primary transition-colors"
                >
                  AI Advisor
                </Link>
              </li>
              <li>
                <Link
                  href={`/hub/${packageName}/scripts`}
                  className="hover:text-brand-primary transition-colors"
                >
                  Trading Scripts
                </Link>
              </li>
              <li>
                <Link
                  href={`/hub/${packageName}/education`}
                  className="hover:text-brand-primary transition-colors"
                >
                  Education Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Disclosures */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal & Disclosures</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  ADV Part 2A & 2B
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Form CRS
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Code of Ethics
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  AI Advisor Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Testimonials Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Cybersecurity Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-brand-border my-8" />

        {/* Important Disclosures */}
        <div className="space-y-6">
          <div className="bg-brand-bg-dark rounded-lg p-6 border border-yellow-500/20">
            <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
              ⚠️ Important Disclosures
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
                <strong className="text-white">Advisory Services:</strong> Eagle
                Investors provides investment advisory services. Please consult
                with a qualified financial advisor before making investment
                decisions.
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
              <p>
                <strong className="text-white">Performance Claims:</strong>{" "}
                Ratings based on independent third-party reviews by Benzinga. 5
                stars and Google Reviews 4.7 stars as of June 2025. No
                compensation was provided for reviews. Individual experiences
                may vary.
              </p>
              <p>
                <strong className="text-white">Form ADV & CRS:</strong> Our Form
                ADV Part 2A & 2B brochures and Client Relationship Summary (Form
                CRS) contain important information about our services, fees, and
                conflicts of interest. Please review these documents carefully.
              </p>
              <p>
                <strong className="text-white">AI Advisor Limitations:</strong>{" "}
                Our AI Advisor tools are designed to support investment research
                and analysis. These tools have limitations and should not be
                relied upon as the sole basis for investment decisions.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-sm text-gray-500">
            <p>&copy; 2025 Eagle Investors. All rights reserved.</p>
            <p>
              Ratings based on independent third-party reviews by Benzinga & 4.7
              stars on Google
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
