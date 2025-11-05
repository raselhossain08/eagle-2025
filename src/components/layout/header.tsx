"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/authContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const {logout} =useAuth()
  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
    } else {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Platinum_Logo_Eagle%20%281%29-qCpKcHYjTtL5kG2dhAmgYRJs468hxW.png"
                alt="Eagle Investors Logo"
                className="w-14 h-14 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-white font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Eagle Investors
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/pricing", label: "Join Premium" },
              { href: "/advising", label: "1 on 1 Advising" },
              { href: "/asset-management", label: "Asset Management" },
              { href: "/technology", label: "Technology" },
              { href: "/disclosures", label: "Disclosures" },
              { href: "/contact", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-[12px] relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Link href="/hub">
                  <LayoutDashboard className="text-white" />
                </Link>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
                >
                  Profile
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-6 py-2 font-semibold rounded-xl transition-all duration-300"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-6 py-2 font-semibold rounded-xl transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
            )}

            <Link href="/education">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Education Library
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-800/50">
            <nav className="flex flex-col space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/pricing", label: "Join Premium" },
                { href: "/advising", label: "1 on 1 Advising" },
                { href: "/asset-management", label: "Asset Management" },
                { href: "/technology", label: "Technology" },
                { href: "/disclosures", label: "Disclosures" },
                { href: "/contact", label: "Contact Us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 transition-colors text-base"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-6">
                {isAuthenticated && (
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-cyan-400 transition-colors text-base"
                  >
                    My Profile
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 py-3 font-semibold rounded-xl"
                    >
                      Login
                    </Button>
                  </Link>
                )}
                <Link href="/education">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 font-semibold rounded-xl">
                    Education Library
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
