"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 mb-8">
            Get in touch with our team for support, questions, or consultation requests
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-300">info@eagle-investors.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-white font-semibold">Address</p>
                    <p className="text-gray-300">
                      8520 Allison Pointe Blvd, Ste 223, PMB 33259
                      <br />
                      Indianapolis, IN 46250-4299 US
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-white font-semibold">Business Hours</p>
                    <p className="text-gray-300">
                      Monday-Friday: 8:00am - 8pm ET
                      <br />
                      Saturday: 11:00am - 3pm ET
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Support */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Get Support</CardTitle>
                <CardDescription className="text-gray-300">
                  Join our platform to open a support ticket and get personalized assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    For the fastest support and personalized assistance, join our platform where you can open a support
                    ticket directly with our team.
                  </p>
                  <Link href="https://pe333tij.sibpages.com" target="_blank">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                      Join Our Platform
                    </Button>
                  </Link>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Platform Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Direct ticket system for support</li>
                    <li>• Faster response times</li>
                    <li>• Access to community resources</li>
                    <li>• Personalized assistance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="bg-slate-800 border-slate-700 mt-12">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">How quickly will I receive a response?</h4>
                <p className="text-gray-300">
                  We typically respond to all inquiries within 24 hours during business days. Platform members receive
                  priority support with faster response times.
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Can I schedule a consultation?</h4>
                <p className="text-gray-300">
                  Yes! Diamond and Infinity members can schedule consultations directly through their dashboard. You can
                  also explore our 1-on-1 advising packages for personalized mentorship.
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Do you offer technical support?</h4>
                <p className="text-gray-300">
                  Absolutely. Our technical support team is available to help with platform issues and account
                  questions. Join our platform to access our ticket system for the fastest assistance.
                </p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">What's the best way to contact you?</h4>
                <p className="text-gray-300">
                  For general inquiries, email us at info@eagle-investors.com. For support and technical issues, we
                  recommend joining our platform and opening a support ticket for the fastest response.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need More Information?</h2>
            <p className="text-gray-300 mb-6">
              Explore our services, read our disclosures, or join our platform to get started with Eagle Investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl font-semibold"
                >
                  View Our Services
                </Button>
              </Link>
              <Link href="/disclosures">
                <Button
                  variant="outline"
                  className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl font-semibold"
                >
                  Read Disclosures
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
