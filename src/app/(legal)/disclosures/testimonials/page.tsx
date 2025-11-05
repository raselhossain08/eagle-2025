import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TestimonialsDisclosurePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/disclosures" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Disclosures
          </Link>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Testimonials Disclosure</h1>
            <p className="text-xl text-gray-300">Important information about client testimonials and reviews</p>
          </div>

          {/* Google Rating Card */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-cyan-400 text-2xl">Average Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-3xl font-bold text-white">4.6 Stars</span>
              </div>
              <p className="text-gray-300 mb-6">Based on Google Reviews</p>
              <Link href="https://g.page/r/CXJ21fKYnqmpEB0" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Google Reviews
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Disclosure Sections */}
          <div className="space-y-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Disclosure Regarding Testimonials</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed">
                <p>
                  The testimonials on this landing page are from previous clients of our investment advisory services.
                  These clients were not compensated in any way for their testimonials.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Client Status</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed">
                <p>
                  Please note that these testimonials are not from current clients. We may occasionally feature reviews
                  from past clients who used our services in the past but are no longer subscribed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Review Source</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed">
                <p>
                  All testimonials are sourced directly from Google Reviews, a public platform where anyone can leave
                  feedback. Some reviewers may also be Google Local Guides, a program where users contribute reviews and
                  information to Google Maps.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Selection Process</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed">
                <p>
                  We do not edit or selectively choose testimonials based on their content. We may showcase a variety of
                  reviews to provide a more complete picture of our client experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Full Reviews</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed">
                <p>
                  The testimonials displayed here may be excerpts from the full reviews found on Google. You can view
                  the complete and unedited reviews by visiting our Google My Business profile by{" "}
                  <Link
                    href="https://g.page/r/CXJ21fKYnqmpEB0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    clicking here
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed">
                <p>
                  Past performance is not necessarily indicative of future results. The experiences reflected in these
                  testimonials are not guaranteed for all clients and do not represent the typical results of our
                  services.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Our Reviews?</h2>
            <p className="text-gray-300 mb-6">
              If you have questions about our testimonials or review process, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                  Contact Us
                </Button>
              </Link>
              <Link href="https://g.page/r/CXJ21fKYnqmpEB0" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl font-semibold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All Reviews
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
