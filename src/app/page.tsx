import { Header } from "@/components/layout/header"
import { Hero } from "@/components/layout/hero"
import { Features } from "@/components/shared/features"
import { TechnologyPreview } from "@/components/shared/technology-preview"
import { PricingTiers } from "@/components/pricing/pricing-tiers"
import { MentorshipPackages } from "@/components/mentorship/mentorship-packages"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <Features />
      <TechnologyPreview />
      <PricingTiers />
      <MentorshipPackages />
      <Footer />
    </div>
  )
}
