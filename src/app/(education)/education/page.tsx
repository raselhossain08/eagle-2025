"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText, Lock, Search, Download } from "lucide-react"

export default function EducationPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const educationContent = {
    webinars: [
      { title: "Advanced Options Strategies", duration: "45 min", level: "Advanced", locked: true },
      { title: "Day Trading Fundamentals", duration: "30 min", level: "Beginner", locked: false },
      { title: "Risk Management Techniques", duration: "60 min", level: "Intermediate", locked: true },
      { title: "Market Psychology & Trading", duration: "40 min", level: "Intermediate", locked: true },
    ],
    ebooks: [
      { title: "The Complete Guide to Swing Trading", pages: "120 pages", level: "Intermediate", locked: true },
      { title: "Options Trading Basics", pages: "80 pages", level: "Beginner", locked: false },
      { title: "Technical Analysis Mastery", pages: "200 pages", level: "Advanced", locked: true },
      { title: "Portfolio Management Strategies", pages: "150 pages", level: "Advanced", locked: true },
    ],
    courses: [
      { title: "Complete Trading Bootcamp", lessons: "25 lessons", level: "All Levels", locked: true },
      { title: "Cryptocurrency Trading", lessons: "15 lessons", level: "Intermediate", locked: true },
      { title: "Forex Trading Fundamentals", lessons: "20 lessons", level: "Beginner", locked: true },
    ],
  }

  const LoginForm = () => (
    <div className="space-y-8">
      {/* Main Access Card */}
      <div className="max-w-md mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">Access Education Library</CardTitle>
            <CardDescription className="text-gray-300">
              Get free access to educational content by creating your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Free Access Available Box */}
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-semibold">Free Access Available!</span>
              </div>
              <p className="text-gray-300 text-sm">
                Create a free account to access basic educational content and get started with your trading journey.
              </p>
            </div>

            {/* Form Fields */}
            <div>
              <Label htmlFor="email" className="text-white text-sm">
                Email
              </Label>
              <Input id="email" type="email" className="bg-slate-700 border-slate-600 text-white mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-white text-sm">
                Password
              </Label>
              <Input id="password" type="password" className="bg-slate-700 border-slate-600 text-white mt-1" />
            </div>

            {/* Buttons */}
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
              onClick={() => setIsLoggedIn(true)}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span>Create Free Account</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              onClick={() => setIsLoggedIn(true)}
            >
              Login to Existing Account
            </Button>

            {/* Free Account Info */}
            <p className="text-gray-400 text-sm">
              <span className="font-semibold">Free Account:</span> Access to basic educational content
            </p>

            <p className="text-center text-gray-400 text-sm">
              Need premium content?{" "}
              <a href="/pricing" className="text-cyan-400 hover:underline">
                Upgrade to Diamond or Infinity
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Choose Your Access Level Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">Choose Your Access Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Free Account Card */}
              <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
                <h3 className="text-green-400 font-bold text-lg mb-4">Free Account</h3>
                <ul className="space-y-2 mb-6 text-gray-300 text-sm">
                  <li>• Basic educational content</li>
                  <li>• Beginner-friendly resources</li>
                  <li>• Community access</li>
                </ul>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
                  onClick={() => setIsLoggedIn(true)}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>Create Free Account</span>
                  </div>
                </Button>
              </div>

              {/* Premium Plans Card */}
              <div className="bg-slate-700 border border-slate-600 rounded-lg p-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">Premium Plans</h3>
                <ul className="space-y-2 mb-6 text-gray-300 text-sm">
                  <li>• Advanced strategies & courses</li>
                  <li>• Exclusive video content</li>
                  <li>• AI advisor access</li>
                </ul>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
                  <a href="/pricing">View Premium Plans</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const ContentGrid = ({ content, type }: { content: any[]; type: string }) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {type === "webinars" && <Video className="w-5 h-5 text-cyan-400" />}
                {type === "ebooks" && <BookOpen className="w-5 h-5 text-cyan-400" />}
                {type === "courses" && <FileText className="w-5 h-5 text-cyan-400" />}
                <span className="text-sm text-gray-400 capitalize">{type.slice(0, -1)}</span>
              </div>
              {item.locked && !isLoggedIn && <Lock className="w-4 h-4 text-gray-500" />}
            </div>
            <CardTitle className="text-white text-lg">{item.title}</CardTitle>
            <CardDescription className="text-gray-300">
              {item.duration || item.pages || item.lessons} • {item.level}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {item.locked && !isLoggedIn ? (
              <Button variant="outline" className="w-full bg-transparent border-slate-600 text-gray-400" disabled>
                <Lock className="w-4 h-4 mr-2" />
                Premium Content
              </Button>
            ) : (
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Access Content
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Education Library</h1>
          <p className="text-xl text-gray-300 mb-8">Comprehensive trading education resources for all skill levels</p>

          {isLoggedIn && (
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search educational content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
          )}
        </div>

        {!isLoggedIn ? (
          <LoginForm />
        ) : (
          <Tabs defaultValue="webinars" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="webinars" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Webinars
              </TabsTrigger>
              <TabsTrigger value="ebooks" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                eBooks
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Courses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="webinars">
              <ContentGrid content={educationContent.webinars} type="webinars" />
            </TabsContent>

            <TabsContent value="ebooks">
              <ContentGrid content={educationContent.ebooks} type="ebooks" />
            </TabsContent>

            <TabsContent value="courses">
              <ContentGrid content={educationContent.courses} type="courses" />
            </TabsContent>
          </Tabs>
        )}

        {!isLoggedIn && (
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Unlock premium educational content with Diamond or Infinity plans</p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <a href="/pricing">View Premium Plans</a>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
